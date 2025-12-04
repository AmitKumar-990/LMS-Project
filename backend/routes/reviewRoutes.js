import express from "express";
import { addReview, getCourseReviews } from "../controll/reviewController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/add", authMiddleware, addReview);
router.get("/:courseId", getCourseReviews);

export default router;