import express from "express";
import { createCourse, getMyCourses, updateCourse, deleteCourse } from "../controllers/courseController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createCourse);
router.get("/my-courses", authMiddleware, getMyCourses);
router.put("/update/:id", authMiddleware, updateCourse);
router.delete("/delete/:id", authMiddleware, deleteCourse);

export default router;