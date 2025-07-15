import express from "express";
import {
  initiatePaymentController,
  handleStkCallbackController,
} from "../controllers/payment.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, initiatePaymentController);
router.post("/callback", handleStkCallbackController);

export default router;
