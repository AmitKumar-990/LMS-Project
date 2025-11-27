import { useState } from "react";
import { forgotPassword } from "../api/authapi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const sendEmail = async () => {
    try {
      await forgotPassword({ email });
      alert("Reset link sent to your email!");
    } catch (err) {
      alert(err.response?.data?.message || "Error sending email");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md shadow p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Forgot Password?</h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded-lg"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg"
          onClick={sendEmail}
        >
          Send Reset Link
        </button>
      </div>
    </div>
  );
}
