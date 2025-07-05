import { loginUser, registerUser, getUser } from "../services/auth.service.js";
import jwt from "jsonwebtoken";
import { createAccessToken, createRefreshToken } from "../utils/utils.token.js";
import dotenv from "dotenv";

dotenv.config();

async function register(req, res) {
  try {
    const user = await registerUser(req.body);
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // ✅ Allow over HTTP (only in development)
      sameSite: "lax", // ✅ "none" won't work without HTTPS
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res
      .status(201)
      .json({ message: "User successfully registered", accessToken });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function login(req, res) {
  try {
    const user = await loginUser(req.body);
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // ✅ Allow over HTTP (only in development)
      sameSite: "lax", // ✅ "none" won't work without HTTPS
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res
      .status(200)
      .json({ message: "User successfully logged in", accessToken });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getUserById(req, res) {
  try {
    const user = await getUser({ id: req.user.id });
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function refresh(req, res) {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    const accessToken = createAccessToken({ id: user.id, role: user.role });
    return res.json({ accessToken });
  });
}

async function logout(req, res) {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false, // use true in production
    sameSite: "lax",
    path: "/",
  });
  return res.sendStatus(204);
}

export { register, login, getUserById, refresh, logout };
