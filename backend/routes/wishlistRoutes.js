import express from "express";
import { toggleWishlist, getWishlist } from "../controll/wishlistController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/toggle", authMiddleware, toggleWishlist);
router.get("/my", authMiddleware, getWishlist);

export default router;