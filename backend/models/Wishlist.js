import mongoose from "mongoose";

const { Schema, model } = mongoose;

const WishlistSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
}, { timestamps: true });

export default model("Wishlist", WishlistSchema);