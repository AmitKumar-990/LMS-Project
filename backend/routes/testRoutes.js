import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { generateTestQuestions } from "../controll/testController.js";

const router = express.Router();

// Generate AI MCQ Test
router.get("/generate/:courseId", authMiddleware, generateTestQuestions);

export default router;