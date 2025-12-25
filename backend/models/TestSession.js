import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    question: String,
    options: [String],
    correctAnswer: String,
});

const TestSessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    questions: [QuestionSchema],
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("TestSession", TestSessionSchema);