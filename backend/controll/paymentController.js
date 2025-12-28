import Stripe from "stripe";
import Course from "../models/Course.js";
import Payment from "../models/Payment.js";
import Enrollment from "../models/Enrollment.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ message: "courseId missing" });
    }

    const studentId = req.user?.id || req.user?._id;
    if (!studentId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const course = await Course.findById(courseId).populate("instructor");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: course.title,
            },
            unit_amount: Math.round(course.price * 100),
          },
          quantity: 1,
        },
      ],

      payment_intent_data: {
        metadata: {
          courseId: course._id.toString(),
          studentId: studentId.toString(),
          instructorId: course.instructor._id.toString(),
        },
      },

      success_url: `${process.env.CLIENT_URL}/my-courses`,
      cancel_url: `${process.env.CLIENT_URL}/buy/${courseId}`,
    });

    return res.json({ url: session.url });

  } catch (err) {
    console.error("❌ Stripe Checkout Error:", err.message);
    return res.status(500).json({ message: err.message });
  }
};

export const confirmEnrollment = async (req, res) => {
  try {
    const { courseId } = req.body;
    const studentId = req.user.id;

    if (!courseId) {
      return res.status(400).json({ message: "courseId required" });
    }

    const enrollment = await Enrollment.findOneAndUpdate(
      { studentId, courseId },
      { studentId, courseId },
      { upsert: true, new: true }
    );

    res.json({
      message: "Enrollment created successfully",
      enrollment,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Signature error:", err.message);
    return res.status(400).send("Webhook Error");
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // 🔥 THIS IS THE FIX
    const paymentIntentId = session.payment_intent;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    const { courseId, studentId } = paymentIntent.metadata || {};

    console.log("📦 METADATA:", paymentIntent.metadata);

    if (!courseId || !studentId) {
      console.error("❌ Missing metadata in payment intent");
      return res.sendStatus(200);
    }

    await Enrollment.findOneAndUpdate(
      { studentId, courseId },
      { studentId, courseId },
      { upsert: true }
    );

    console.log("✅ ENROLLMENT CREATED");
  }

  res.sendStatus(200);
};
