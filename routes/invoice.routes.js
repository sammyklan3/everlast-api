import express from "express";
import { createInvoiceController } from "../controllers/invoice.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/authorize.middleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin", "staff"),
  createInvoiceController
);

export default router;
