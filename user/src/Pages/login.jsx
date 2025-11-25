import { useState } from "react";
import { auth, googleProvider } from "../firebase";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import RoleSelector from "../component/roleselector";

export default function Login() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert(`Logged in as ${role}`);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert(`Google login as ${role}`);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleForgot = async () => {
    if (!email) return alert("Enter email first!");
    await sendPasswordResetEmail(auth, email);
    alert("Reset email sent");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      
      {/* LEFT SIDE IMAGE */}
      <div className="hidden md:flex bg-gray-100 items-center justify-center">
        <img
          src="/src/assets/1.png"
          className="w-4/5 rounded-3xl shadow-xl"
          alt="Edu"
        />
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="flex items-center justify-center px-10">
        <div className="w-full max-w-md">
          
          <h1 className="text-3xl font-semibold text-gray-800 text-center">
            Get-Skillz Welcome You👋
          </h1>
          <p className="text-gray-500 text-center mt-1 mb-6">
            Login to your Get-Skillz account
          </p>

          {!role ? (
            <RoleSelector setRole={setRole} />
          ) : (
            <>
              <label className="text-gray-700 text-sm">Email</label>
              <input
                type="email"
                className="w-full mt-1 mb-4 px-4 py-2 border rounded-xl focus:ring focus:ring-blue-200"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <label className="text-gray-700 text-sm">Password</label>
              <input
                type="password"
                className="w-full mt-1 mb-4 px-4 py-2 border rounded-xl focus:ring focus:ring-blue-200"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <p
                onClick={handleForgot}
                className="text-blue-600 text-sm mb-3 cursor-pointer hover:underline"
              >
                Forgot Password?
              </p>

              <button
                onClick={handleLogin}
                className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
              >
                Login
              </button>

              <div className="flex items-center my-4">
                <div className="h-px bg-gray-300 w-full"></div>
                <span className="px-3 text-gray-500">OR</span>
                <div className="h-px bg-gray-300 w-full"></div>
              </div>

              <button
                onClick={handleGoogleLogin}
                className="w-full py-2 border rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5" />
                Login with Google
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
