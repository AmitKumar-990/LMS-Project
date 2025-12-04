import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getCourseById } from "../api/courseAPI";
import { createPaymentIntent, confirmPayment } from "../api/paymentAPI";

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// import CheckoutForm from "../component/Payment/CheckoutForm";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUB_KEY ||
    "pk_test_51SQM9ICuvssCQYItyTBvt1efqewEyMN9jcBptYC1sFeyrwxE71V95sS69t8Buicg77THTa0DJgIdl1QhOBNpgFnN00iz9UYNF3"
);

function MergedCheckoutForm({ clientSecret, course }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    const card = elements.getElement(CardElement);

    const res = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name:
            JSON.parse(localStorage.getItem("user") || "{}").name || "Student",
        },
      },
    });

    if (res.error) {
      alert(res.error.message || "Payment failed");
      setProcessing(false);
      return;
    }

    if (
      res.paymentIntent &&
      (res.paymentIntent.status === "succeeded" ||
        res.paymentIntent.status === "requires_capture")
    ) {
      try {
        await confirmPayment(res.paymentIntent.id);
        alert("Payment successful! Enrollment created.");
        navigate("/my-courses");
      } catch (err) {
        console.error(err);
        alert("Payment succeeded but enrollment was not recorded.");
      }
    } else {
      alert("Payment status: " + res.paymentIntent?.status);
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 p-3 border rounded">
        <CardElement options={{ hidePostalCode: true }} />
      </div>

      <button
        type="submit"
        disabled={!stripe || processing}
        className="px-6 py-3 bg-blue-600 text-white rounded w-full"
      >
        {processing ? "Processing..." : `Pay ₹${course.price}`}
      </button>
    </form>
  );
}

export default function BuyCourse() {
  const { courseId } = useParams();

  const [clientSecret, setClientSecret] = useState(null);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    (async () => {
      const courseRes = await getCourseById(courseId);
      setCourse(courseRes.data);

      const payRes = await createPaymentIntent(courseId);
      setClientSecret(payRes.data.clientSecret);
    })();
  }, [courseId]);

  if (!course || !clientSecret)
    return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* LEFT — Course Details */}
        <div className="bg-white shadow rounded-xl p-6 h-fit">
          <img
            src={course.thumbnailUrl}
            className="w-full h-48 object-cover rounded-lg"
            alt=""
          />

          <h1 className="text-2xl font-bold mt-4">{course.title}</h1>
          <p className="text-gray-600 text-sm mt-1">
            By {course.instructor?.name}
          </p>

          <p className="text-3xl font-bold text-blue-600 mt-4">
            ₹{course.price}
          </p>

          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-3">You Will Get:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✔ Lifetime access</li>
              <li>✔ Certificate after completion</li>
              <li>✔ Mobile & web access</li>
              <li>✔ Downloadable resources</li>
              <li>✔ 24/7 Instructor support</li>
            </ul>
          </div>

          <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-blue-700 text-sm flex items-center gap-2">
              🔒 100% Secure Payment with Stripe
            </p>
          </div>
        </div>

        {/* RIGHT — Payment */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-5">Complete Your Payment</h2>

          <Elements
            stripe={stripePromise}
            options={{ clientSecret, appearance: { theme: "flat" } }}
          >
            <MergedCheckoutForm course={course} clientSecret={clientSecret} />
          </Elements>
        </div>
      </div>
    </div>
  );
}
