// backend/models/Enrollment.js
import mongoose from "mongoose";

const EnrollmentSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Enrollment", EnrollmentSchema);