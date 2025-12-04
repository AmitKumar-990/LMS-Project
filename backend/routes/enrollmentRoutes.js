import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import Enrollment from "../models/Enrollment.js";

const router = express.Router();

router.get("/check/:courseId", authMiddleware, async(req, res) => {
    const studentId = req.user.id;
    const { courseId } = req.params;

    const exists = await Enrollment.findOne({ studentId, courseId });

    res.json({ enrolled: !!exists });
});

router.get("/my", authMiddleware, async(req, res) => {
    const studentId = req.user.id;

    const enrollments = await Enrollment.find({ studentId })
        .populate("courseId");

    res.json(enrollments.map(e => ({
        id: e._id,
        course: e.courseId
    })));
});


export default router;