import express from "express";
import { createCourse, updateCourse, deleteCourse, getCoursesByInstructor, getCourseById } from "../controll/courseController.js";
import { getAllCourses } from "../controll/courseController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/instructor/:instructorId", getCoursesByInstructor);

router.post("/create", authMiddleware, createCourse);
router.get("/all", getAllCourses);
router.get('/:id', authMiddleware, getCourseById);
router.put("/update/:id", authMiddleware, updateCourse);
router.delete("/delete/:id", authMiddleware, deleteCourse);

export default router;