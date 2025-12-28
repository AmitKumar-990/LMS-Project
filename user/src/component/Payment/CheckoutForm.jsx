import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";

import Swal from "sweetalert2";

import { confirmPayment } from "../../api/paymentAPI";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm({ course }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const card = elements.getElement(CardElement);

    const result = await stripe.confirmCardPayment(
    //   clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: JSON.parse(localStorage.getItem("user") || "{}").name
          },
        },
      }
    );

    if (result.error) {
      Swal.fire(result.error.message);
      setLoading(false);
      return;
    }

    if (result.paymentIntent.status === "succeeded") {
      await confirmPayment(result.paymentIntent.id);
      Swal.fire("Payment Successful!");
      navigate("/my-courses");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handlePayment} className="space-y-5">
      <div>
        <label className="block mb-2 font-medium">Card Details</label>
        <div className="border rounded-lg p-3 shadow-sm bg-gray-50">
          <CardElement
            options={{
              hidePostalCode: true,
              style: {
                base: {
                  fontSize: "16px",
                  color: "#333",
                  "::placeholder": { color: "#aaa" }
                },
              },
            }}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg shadow transition-all"
      >
        {loading ? "Processing..." : `Pay ₹${course.price}`}
      </button>
    </form>
  )
}
