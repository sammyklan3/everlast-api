import { getAllUsers, getUserById, suspendUser, unsuspendUser } from "../services/user.service.js";

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get user by ID
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    res.status(200).json(user);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}

// Suspend a user account
const suspendUserAccount = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await suspendUser(id);
        res.status(200).json({ message: "User suspended successfully", user });
    } catch (error) {
            res.status(500).json({ message: error.message });
    }
}

// Unsuspend a user account
const unsuspendUserAccount = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await unsuspendUser(id);
        res.status(200).json({ message: "User unsuspended successfully", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { getUsers, getUser, suspendUserAccount, unsuspendUserAccount };