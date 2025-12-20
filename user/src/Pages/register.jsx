import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authAPI";
import RoleSelector from "../component/roleselector";
import Swal from "sweetalert2";

export default function Register() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !role) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "All fields including role are required.",
      });
      return;
    }

    setLoading(true);

    try {
      await registerUser({ name, email, password, role });

      Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: "Your account has been successfully registered.",
        timer: 1800,
        showConfirmButton: false,
      });

      setTimeout(() => navigate("/login"), 1800);

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.response?.data?.message || "Something went wrong.",
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
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .floaty { animation: floaty 7s ease-in-out infinite; }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">

        <div
          aria-hidden="true"
          className="pointer-events-none fixed -bottom-32 -right-20 w-96 h-96 rounded-full 
                     bg-gradient-to-tr from-green-200 to-emerald-300 opacity-30 floaty blur-3xl"
        />

        <main className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
          
          <div className="text-center mb-6">
            <img src="/src/assets/logo.png" className="mx-auto w-12 h-12 mb-3" alt="Logo" />
            <h1 className="text-2xl font-bold text-gray-800">Create Your Account</h1>
            <p className="text-gray-500 text-sm mt-1">
              Join <span className="font-semibold">Get-Skillz</span> and start learning today.
            </p>
          </div>

          <div className="mb-4">
            {!role ? (
              <RoleSelector setRole={setRole} />
            ) : (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700">
                  You are registering as <strong>{role}</strong>
                </span>
                <button
                  className="text-blue-600 underline text-xs"
                  onClick={() => setRole("")}
                >
                  Change
                </button>
              </div>
            )}
          </div>

          {role && (
            <form onSubmit={handleRegister} className="space-y-4">

              <label className="block">
                <span className="text-sm font-medium text-gray-700">Full Name</span>
                <input
                  type="text"
                  placeholder="Enter name shown to Student"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full px-4 py-3 bg-gray-50 border rounded-lg 
                             focus:ring-2 focus:ring-green-400 focus:bg-white transition"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-gray-700">Email</span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full px-4 py-3 bg-gray-50 border rounded-lg 
                             focus:ring-2 focus:ring-green-400 focus:bg-white transition"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-gray-700">Password</span>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full px-4 py-3 bg-gray-50 border rounded-lg 
                             focus:ring-2 focus:ring-green-400 focus:bg-white transition"
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg text-white font-medium transition ${
                  loading
                    ? "bg-green-300 cursor-wait"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

            </form>
          )}

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-green-600 underline font-medium">
              Login
            </a>
          </p>
        </main>
      </div>
    </>
  );
}
