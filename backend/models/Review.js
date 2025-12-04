import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ReviewSchema = new Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    review: {
        type: String,
    },
}, { timestamps: true });

export default model("Review", ReviewSchema);