import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getCourseById } from "../api/courseAPI";
import { createCheckoutSession } from "../api/paymentAPI";

export default function BuyCourse() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCourseById(courseId).then(res => setCourse(res.data));
  }, [courseId]);


  const handleCheckout = async () => {
    try {
      const res = await createCheckoutSession(course._id);
      localStorage.setItem("purchasedCourse", courseId)
      window.location.href = res.data.url;
    } catch (err) {
      console.error(err);
      Swal.fire("Payment initialization failed");
    }
  };


  if (!course) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="max-w-xl w-full bg-white shadow rounded-xl p-6">
        <img src={course.thumbnailUrl} className="w-full h-48 object-cover rounded" />

        <h1 className="text-2xl font-bold mt-4">{course.title}</h1>
        <p className="text-gray-600">By {course.instructor?.name}</p>

        <p className="text-3xl font-bold text-blue-600 mt-4">₹{course.price}</p>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg text-lg"
        >
          {loading ? "Redirecting..." : "Proceed to Secure Payment"}
          {/* Proceed to Secure Payment */}
        </button>

        <p className="text-sm text-center text-gray-500 mt-3">
          🔒 Powered by Stripe Checkout
        </p>
      </div>
    </div>
  );
}
