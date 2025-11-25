import { useState } from "react";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleReset = async () => {
    if (!email) return alert("Please enter your email");

    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* IMAGE SECTION */}
      <div className="hidden md:flex bg-gray-100 items-center justify-center">
        <img
          src="/src/assets/auth-bg.jpg"
          className="w-4/5 rounded-3xl shadow-xl"
          alt="Edu"
        />
      </div>

      {/* FORM SECTION */}
      <div className="flex items-center justify-center px-10">
        <div className="w-full max-w-md">

          <h1 className="text-3xl font-semibold text-gray-800 text-center">
            Forgot Password?
          </h1>

          <p className="text-gray-500 text-center mt-1 mb-6">
            {sent
              ? "Check your inbox for the reset link."
              : "Enter the email associated with your account."}
          </p>

          {!sent && (
            <>
              <label className="text-gray-700 text-sm">Email</label>
              <input
                type="email"
                className="w-full mt-1 mb-4 px-4 py-2 border rounded-xl focus:ring focus:ring-blue-200"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                onClick={handleReset}
                className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
              >
                Send Reset Link
              </button>
            </>
          )}

          <p className="text-center text-sm mt-5 text-gray-600">
            Back to{" "}
            <a href="/" className="text-blue-600 font-semibold">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
