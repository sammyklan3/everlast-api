import User from "../models/user.js";

// Get all users
const getAllUsers = async () => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get user by ID
const getUserById = async (id) => {
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Suspend a user account
const suspendUser = async (id) => {
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      throw new Error("User not found");
    }

    // check if the user is already suspended
    if (user.status === "suspended") {
      throw new Error("User is already suspended");
    }
    user.status = "suspended";
    await user.save();
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Unsuspend a user account
const unsuspendUser = async (id) => {
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      throw new Error("User not found");
    }
    // check if the user is already active
    if (user.status === "active") {
      throw new Error("User is already active");
    }
    user.status = "active";
    await user.save();
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { getAllUsers, getUserById, suspendUser, unsuspendUser };
