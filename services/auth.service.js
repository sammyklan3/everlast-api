import bcrypt from "bcrypt";
import User from "../models/user.js";
import { isValidEmail } from "../utils/utils.validator.js";

async function registerUser({ name, email, phone, password } = {}) {
  const requiredFields = { name, email, phone, password };

  for (const [key, value] of Object.entries(requiredFields)) {
    if (!value) {
      throw new Error(`${key} is required`);
    }
  }
  if (!isValidEmail(email)) {
    throw new Error("Invalid email format");
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("User already exists with this email");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    return user;
  } catch (error) {
    throw new Error(`Failed to create user: ${error.message}`);
  }
}

async function loginUser({ email, password } = {}) {
  const requiredFields = { email, password };

  for (const [key, value] of Object.entries(requiredFields)) {
    if (!value) {
      throw new Error(`${key} is required`);
    }
  }

  if (!isValidEmail(email)) {
    throw new Error("Invalid email format");
  }

  try {
    const user = await User.findOne({ where: { email } });

    const isPasswordValid =
      user && (await bcrypt.compare(password, user.password));

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    user.last_login = new Date();
    await user.save();

    const { password: _removed, ...safeUser } = user.toJSON();

    return safeUser;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getUser({ id }) {
  if (!id) {
    throw new Error("User ID is required");
  }

  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }

    const userData = user.get({ plain: true });
    delete userData.password;

    return userData;
  } catch (error) {
    throw new Error(`Failed to retrieve user: ${error.message}`);
  }
}

export { registerUser, loginUser, getUser };
