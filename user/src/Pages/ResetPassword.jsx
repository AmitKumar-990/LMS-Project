import { useState } from "react";
import { resetPassword } from "../api/authapi";
import { useParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleReset = async () => {
    try {
      await resetPassword({ token, newPassword: password });
      alert("Password reset successful!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md shadow p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>

        <input
          type="password"
          placeholder="New Password"
          className="w-full px-4 py-2 border rounded-lg"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full mt-4 py-2 bg-green-600 text-white rounded-lg"
          onClick={handleReset}
        >
          Update Password
        </button>
      </div>
    </div>
  );
}
