import { useState } from "react";
import Swal from "sweetalert2";
import { forgotPassword } from "../api/authAPI";
// import Navbar from "../component/nav-short";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const emailValid = /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await forgotPassword({ email });
      setSuccess("Reset link sent! Check your email.");
      setEmail("");
      
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (err) {
      Swal.fire(err.response?.data?.message || "Error sending email");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Forgot Password?
        </h1>

        <p className="text-gray-600 text-center mt-2">
          Enter your registered email to receive a reset link.
        </p>

        <div className="mt-6">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!emailValid || loading}
          className={`w-full mt-5 py-3 rounded-lg text-white font-semibold ${
            emailValid
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {success && (
          <p className="text-green-600 text-center mt-4 font-medium animate-pulse">
            {success}
          </p>
        )}

        <p className="text-center text-gray-600 mt-5">
          <a href="/" className="text-blue-600 font-medium hover:underline">
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
}
