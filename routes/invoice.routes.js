import express from "express";
import {
  createInvoiceController,
  getAllInvoicesController,
  getInvoiceByIdController,
} from "../controllers/invoice.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/authorize.middleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin", "staff"),
  createInvoiceController
);
router.get("/", authMiddleware, getAllInvoicesController);

router.get("/:id", authMiddleware, getInvoiceByIdController);

export default router;
