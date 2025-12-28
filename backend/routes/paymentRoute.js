// import express from "express";
// import {
//   createCheckoutSession,
//   stripeWebhook,
// } from "../controll/paymentController.js";
// import { authMiddleware } from "../middleware/auth.js";

// const router = express.Router();

// router.post("/webhook", stripeWebhook);

// router.post(
//   "/create-checkout-session",
//   authMiddleware,
//   createCheckoutSession
// );

// export default router;


import express from "express";
import { createCheckoutSession, stripeWebhook } from "../controll/paymentController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/webhook", stripeWebhook);

router.post(
  "/create-checkout-session",
  authMiddleware,
  createCheckoutSession
);

export default router;
