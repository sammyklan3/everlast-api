import { Router } from "express";
import authRoutes from "./auth.routes.js";
import shipmentRoutes from "./shipment.routes.js";
import companyRoutes from "./company.routes.js";
import userRoutes from "./user.routes.js";
import statsRoutes from "./stats.routes.js";
import invoiceRoutes from "./invoice.routes.js";
import paymentRoutes from "./payment.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/shipments", shipmentRoutes);
router.use("/stats", statsRoutes);
router.use("/companies", companyRoutes);
router.use("/users", userRoutes);
router.use("/invoices", invoiceRoutes);
router.use("/payments", paymentRoutes);

export default router;
