import Enrollment from "../models/Enrollment.js";

export const confirmEnrollment = async (req, res) => {
  try {
    const { courseId } = req.body;
    const studentId = req.user.id;

    if (!courseId) {
      return res.status(400).json({ message: "courseId required" });
    }

    const enrollment = await Enrollment.findOneAndUpdate(
      { studentId, courseId },
      { studentId, courseId },
      { upsert: true, new: true }
    );

    return res.json({
      message: "Enrollment created",
      enrollment,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
