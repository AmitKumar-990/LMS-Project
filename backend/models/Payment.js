// models/Payment.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const PaymentSchema = new Schema({
    stripePaymentIntentId: {
        type: String,
        required: true,
        index: true,
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    instructorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        default: "inr",
    },
    status: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    raw: {
        type: Object, // optional full Stripe response
    },
}, { strict: false });

export default mongoose.model("Payment", PaymentSchema);