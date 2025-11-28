import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    category: String,
    price: { type: Number, default: 0 },
    thumbnailUrl: String,
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chapter" }],
}, { timestamps: true });

export default mongoose.model("Course", CourseSchema);