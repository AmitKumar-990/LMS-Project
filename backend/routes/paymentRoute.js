import express from "express";
import { createPaymentIntent, confirmPayment, stripeWebhook, } from "../controll/paymentController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    stripeWebhook
);

router.post("/create-payment-intent", authMiddleware, createPaymentIntent);
router.post("/confirm", authMiddleware, confirmPayment);

export default router;