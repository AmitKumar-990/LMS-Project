import { useState, useMemo } from "react";
import Swal from "sweetalert2";
import { resetPassword } from "../api/authAPI";
import { useParams, useNavigate } from "react-router-dom";
import PasswordStrengthBar from "../component/PasswordStrengthBar";
import ValidationList from "../component/ValidationList";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [showConfPass, setShowConfPass] = useState(false);

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const validations = useMemo(() => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };
  }, [password]);

  const strength = useMemo(() => {
    const score = Object.values(validations).filter(Boolean).length;
    if (score === 0) return "";
    if (score <= 2) return "Weak";
    if (score === 3) return "Medium";
    return "Strong";
  }, [validations]);

  const handleSubmit = async () => {
    if (password !== confPassword) {
      Swal.fire("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      await resetPassword({ token, newPassword: password });
      setSuccessMsg("Password reset successful! Redirecting...");
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      Swal.fire(err.response?.data?.message || "Something went wrong");
    }

    setLoading(false);
  };

  const isValid =
    validations.length &&
    validations.uppercase &&
    validations.number &&
    validations.special &&
    confPassword === password;

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

      <div className="flex justify-center mb-4">
        <img
          src="/logo.png" 
          alt="Get-Skillz Logo"
          className="h-12"
        />
      </div>

      {/* Heading */}
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Reset your password
      </h2>
      <p className="text-center text-gray-500 mt-1">
        Create a strong new password
      </p>

      <div className="mt-6 space-y-5">

        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            placeholder="New password"
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="absolute right-5 top-4 cursor-pointer text-gray-500"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? "🙈" : "👁️"}
          </span>
        </div>

        <PasswordStrengthBar strength={strength} />
        <ValidationList validations={validations} />

        <div className="relative">
          <input
            type={showConfPass ? "text" : "password"}
            placeholder="Confirm password"
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <span
            className="absolute right-5 top-4 cursor-pointer text-gray-500"
            onClick={() => setShowConfPass(!showConfPass)}
          >
            {showConfPass ? "🙈" : "👁️"}
          </span>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!isValid || loading}
          className={`w-full py-3 rounded-xl text-white font-semibold transition ${
            isValid
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

        {successMsg && (
          <p className="text-green-600 text-center font-medium">
            {successMsg}
          </p>
        )}

        <p className="text-center text-sm text-gray-400 mt-2">
          You’ll be redirected to login automatically
        </p>
      </div>
    </div>
  </div>
);

}
