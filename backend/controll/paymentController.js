import Stripe from "stripe";
import Course from "../models/Course.js";
import Payment from "../models/Payment.js";
import Enrollment from "../models/Enrollment.js";
// import User from "../models/user.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async(req, res) => {
    try {
        const { courseId } = req.body;
        const studentId = req.user.id;

        if (!courseId) return res.status(400).json({ message: "courseId required" });

        const course = await Course.findById(courseId).populate("instructor");
        if (!course) return res.status(404).json({ message: "Course not found" });

        const amount = Math.round((course.price || 0) * 100);

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "inr",
            metadata: {
                courseId: course._id.toString(),
                studentId,
                instructorId: course.instructor._id.toString()
            }
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
            amount,
            currency: paymentIntent.currency
        });
    } catch (err) {
        console.error("createPaymentIntent error:", err);
        res.status(500).json({ message: err.message });
    }
};

export const confirmPayment = async(req, res) => {
    try {
        const { paymentIntentId } = req.body;
        if (!paymentIntentId) return res.status(400).json({ message: "paymentIntentId required" });

        const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
        if (!intent) return res.status(400).json({ message: "PaymentIntent not found" });

        if (intent.status !== "succeeded") {
            return res.status(400).json({ message: "Payment not successful", status: intent.status });
        }

        const metadata = intent.metadata || {};
        const courseId = metadata.courseId;
        const studentId = metadata.studentId;
        const instructorId = metadata.instructorId;
        const amount = intent.amount_received || intent.amount;
        const currency = intent.currency;

        const existing = await Payment.findOne({ stripePaymentIntentId: intent.id });
        if (existing) {
            return res.status(200).json({ message: "Already recorded", payment: existing });
        }

        const payment = await Payment.create({
            stripePaymentIntentId: intent.id,
            studentId,
            instructorId,
            courseId,
            amount,
            currency,
            status: intent.status,
            raw: intent
        });

        const existingEnroll = await Enrollment.findOne({ studentId, courseId });
        if (!existingEnroll) {
            await Enrollment.create({ studentId, courseId });
        }

        res.json({ message: "Payment recorded and enrollment created", payment });
    } catch (err) {
        console.error("confirmPayment error:", err);
        res.status(500).json({ message: err.message });
    }
};

export const stripeWebhook = async(req, res) => {
    const signature = req.headers["stripe-signature"];

    let event;
    try {
        event = stripe.webhooks.constructEvent(
            req.rawBody,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.log("❌ Webhook signature verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "payment_intent.succeeded") {
        const intent = event.data.object;

        const metadata = intent.metadata || {};
        const { courseId, studentId, instructorId } = metadata;

        const existing = await Payment.findOne({ stripePaymentIntentId: intent.id });
        if (!existing) {
            await Payment.create({
                stripePaymentIntentId: intent.id,
                studentId,
                instructorId,
                courseId,
                amount: intent.amount,
                currency: intent.currency,
                status: intent.status,
                raw: intent
            });

            const enrolled = await Enrollment.findOne({ studentId, courseId });
            if (!enrolled) {
                await Enrollment.create({ studentId, courseId });
            }
        }
    }

    res.sendStatus(200);
};