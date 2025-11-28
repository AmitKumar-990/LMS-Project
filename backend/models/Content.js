import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
    chapter: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter", required: true },
    type: { type: String, enum: ["video", "pdf", "text", "image"], required: true },
    title: String,
    description: String,
    videoUrl: String,
    thumbnailUrl: String,
    pdfUrl: String,
    textData: String,
    duration: Number, // optional
}, { timestamps: true });

export default mongoose.model("Content", ContentSchema);