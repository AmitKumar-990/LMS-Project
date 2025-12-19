import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import Enrollment from "../models/Enrollment.js";

const router = express.Router();

// Check if user enrolled in a course
router.get("/check/:courseId", authMiddleware, async (req, res) => {
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

// // Get logged-in user's enrollments
// router.get("/my", authMiddleware, async (req, res) => {
//   try {
//     const enrollments = await Enrollment.find({ studentId: req.user.id })
//       .populate("course");

//     // 🔥 Prevent null course crash
//     const validEnrollments = enrollments.filter(e => e.course);

//     res.json(validEnrollments);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

export default router;
