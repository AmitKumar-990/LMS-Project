import { useState } from "react";
import { loginUser } from "../api/authAPI";
import { useNavigate } from "react-router-dom";
import RoleSelector from "../component/roleselector";

export default function Login() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    const { data } = await loginUser({ email, password });

    // ✅ Save essential user info
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("role", data.user.role);
    localStorage.setItem("userId", data.user._id); // <-- IMPORTANT FIX

    // Redirect based on role
    if (data.user.role === "instructor") {
      navigate("/instructor/dashboard");
    } else {
      navigate("/");
    }
  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};



  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* LEFT IMAGE */}
      <div className="hidden md:flex bg-gray-100 items-center justify-center">
        <img src="/src/assets/1.png" className="w-4/5 rounded-3xl" alt="" />
      </div>

      {/* RIGHT FORM */}
      <div className="flex items-center justify-center px-10">
        <div className="w-full max-w-md">

          <h1 className="text-3xl font-semibold text-gray-800 text-center">
            Welcome Back 👋
          </h1>

          {!role ? (
            <RoleSelector setRole={setRole} />
          ) : (
            <>
              <input
                type="email"
                placeholder="Email"
                className="w-full mt-4 px-4 py-2 border rounded-lg"
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full mt-4 px-4 py-2 border rounded-lg"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                onClick={handleLogin}
                className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Login
              </button>

              {/* FORGOT PASSWORD */}
              <p className="text-center mt-3 text-blue-600 cursor-pointer">
                <a href="/forgot-password">Forgot Password?</a>
              </p>

              {/* GOOGLE SIGN-IN BUTTON */}
              <button
                onClick={() =>
                  (window.location.href = "http://localhost:5000/api/google")
                }
                className="w-full mt-4 py-2 flex items-center justify-center gap-3 border rounded-lg hover:bg-gray-100 transition"
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  className="w-5"
                />
                Continue with Google
              </button>

              <p className="text-center text-sm mt-5 text-gray-600">
                Don’t have an account?{" "}
                <a href="/register" className="text-blue-600 font-semibold">
                  Create Account
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
