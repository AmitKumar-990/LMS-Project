import express from "express";
import { getInstructorStats } from "../controll/analyticController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/instructor", authMiddleware, getInstructorStats);

export default router;