import mongoose from "mongoose";

const ChapterSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },

    title: { type: String, required: true },
    description: { type: String, default: "" },

    videoUrl: { type: String, default: "" },
    thumbnailUrl: { type: String, default: "" },
    videoDuration: { type: Number, default: 0 },
    pdfUrl: { type: String, default: "" },

    order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Chapter", ChapterSchema);