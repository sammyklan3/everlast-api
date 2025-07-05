import express from "express";
import {
  createShipmentController,
  getAllShipmentsController,
  getShipmentByIdController,
  updateShipmentController,
  deleteShipmentController,
} from "../controllers/shipment.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/authorize.middleware.js";

const router = express.Router();

// Shipment Routes
router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin", "staff"),
  createShipmentController
);
router.get("/", authMiddleware, getAllShipmentsController);
router.get("/:id", authMiddleware, getShipmentByIdController);
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin", "staff"),
  updateShipmentController
);
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteShipmentController
);

export default router;
