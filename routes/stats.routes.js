import statsController from "../controllers/stats.controller.js";
import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/authorize.middleware.js";
const router = express.Router();

router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin", "staff", "client"),
  statsController
);

export default router;
