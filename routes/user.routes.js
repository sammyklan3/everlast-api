import express from "express";
import {
  getUsers,
  getUser,
  suspendUserAccount,
  unsuspendUserAccount,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/authorize.middleware.js";

const router = express.Router();

// Route to get all users
router.get("/", authMiddleware, authorizeRoles("admin", "staff"), getUsers);
// Route to get a user by ID
router.get("/:id", authMiddleware, authorizeRoles("admin", "staff"), getUser);
// Route to suspend a user account
router.put(
  "/:id/suspend",
  authMiddleware,
  authorizeRoles("admin"),
  suspendUserAccount
);
// Route to unsuspend a user account
router.put(
  "/:id/unsuspend",
  authMiddleware,
  authorizeRoles("admin"),
  unsuspendUserAccount
);

export default router;
