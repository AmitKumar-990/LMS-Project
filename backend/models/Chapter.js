import mongoose from "mongoose";

const ChapterSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true },
    description: String,
    contents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Content" }],
}, { timestamps: true });

export default mongoose.model("Chapter", ChapterSchema);