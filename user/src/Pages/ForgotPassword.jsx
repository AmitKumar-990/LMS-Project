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
      setSuccess("Reset link sent! Redirecting to login.");
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
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

      {/* Logo */}
      <div className="flex justify-center mb-4">
        <img
          src="/logo.png"   // 🔥 update if needed
          alt="Get-Skillz Logo"
          className="h-12"
        />
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        Forgot your password?
      </h1>

      <p className="text-gray-500 text-center mt-2">
        No worries! We’ll send you a reset link.
      </p>

      {/* Email */}
      <div className="mt-6">
        <input
          type="email"
          placeholder="Enter your registered email"
          className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Button */}
      <button
        onClick={handleSubmit}
        disabled={!emailValid || loading}
        className={`w-full mt-6 py-3 rounded-xl text-white font-semibold transition ${
          emailValid
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>

      {/* Success */}
      {success && (
        <p className="text-green-600 text-center mt-4 font-medium">
          {success}
        </p>
      )}

      {/* Footer */}
      <p className="text-center text-sm text-gray-500 mt-6">
        Remember your password?{" "}
        <a href="/" className="text-blue-600 font-medium hover:underline">
          Back to Login
        </a>
      </p>
    </div>
  </div>
);

}
