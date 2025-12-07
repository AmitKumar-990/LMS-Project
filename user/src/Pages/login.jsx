import { useState } from "react";
import { loginUser } from "../api/authAPI";
import { useNavigate } from "react-router-dom";
import RoleSelector from "../component/roleselector";
import Swal from "sweetalert2";

export default function Login() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please enter email and password.",
      });
      return;
    }

    setLoading(true);

    try {
      const { data } = await loginUser({ email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("userId", data.user._id);

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => {
        if (data.user.role === "instructor") navigate("/instructor/dashboard");
        else navigate("/");
      }, 1500);

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes floaty {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        .floaty { animation: floaty 6s ease-in-out infinite; }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed -top-32 -left-20 w-96 h-96 rounded-full bg-gradient-to-tr from-blue-200 to-indigo-300 opacity-30 floaty blur-3xl"
          style={{ zIndex: 0 }}
        />

        <main
          className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl p-8"
          role="main"
          aria-labelledby="login-heading"
        >
          <header className="text-center mb-6">
            <img
              src="/src/assets/logo.png"
              alt="Get-Skillz logo"
              className="mx-auto w-12 h-12 mb-3"
            />
            <h1 id="login-heading" className="text-2xl font-bold text-gray-800">
              Welcome back
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Sign in to continue to <span className="font-semibold">Get-Skillz</span>
            </p>
          </header>

          <div className="mb-4">
            {!role ? (
              <RoleSelector setRole={setRole} />
            ) : (
              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-600">Signing in as <strong className="text-gray-800">{role}</strong></div>
                <button
                  className="text-blue-600 underline text-xs"
                  onClick={() => setRole("")}
                  aria-label="Change role"
                >
                  Change
                </button>
              </div>
            )}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-3 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-400 transition"
                placeholder="you@example.com"
                aria-label="Email"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-3 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-400 transition"
                placeholder="••••••••"
                aria-label="Password"
              />
            </label>

            {/* {error && <p className="text-sm text-red-600">{error}</p>} */}

            <div className="grid grid-cols-1 gap-3">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg text-white font-semibold transition ${
                  loading ? "bg-blue-300 cursor-wait" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

              <button
                type="button"
                onClick={() => (window.location.href = "http://localhost:5000/api/google")}
                className="w-full py-2 flex items-center justify-center gap-3 border rounded-lg hover:bg-gray-50 transition"
                aria-label="Continue with Google"
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt=""
                  className="w-5"
                />
                Continue with Google
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <a href="/forgot-password" className="text-blue-600 underline mr-3">Forgot password?</a>
            <a href="/register" className="text-blue-600 underline">Create account</a>
          </div>

          <p className="mt-4 text-xs text-gray-400 text-center">
            By signing in you agree to our Terms and Privacy.
          </p>
        </main>
      </div>
    </>
  );
}
