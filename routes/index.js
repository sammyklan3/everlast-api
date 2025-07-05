import { Router } from "express";
import authRoutes from "./auth.routes.js";
import shipmentRoutes from "./shipment.routes.js";
import companyRoutes from "./company.routes.js";
import userRoutes from "./user.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/shipments", shipmentRoutes);
router.use("/companies", companyRoutes);
router.use("/users", userRoutes);

export default router;
