import jwt from "jsonwebtoken";

const createAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
      iss: "everlast",
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    }
  );
};

const createRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
      iss: "everlast",
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    }
  );
};

export { createAccessToken, createRefreshToken };
