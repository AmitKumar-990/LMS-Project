import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import RoleSelector from "../component/roleselector";

export default function Register() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert(`Account created as ${role}`);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      <div className="hidden md:flex bg-gray-100 items-center justify-center">
        <img
          src="/src/assets/1.png"
          className="w-4/5 rounded-3xl shadow-xl"
          alt="Edu"
        />
      </div>

      <div className="flex items-center justify-center px-10">
        <div className="w-full max-w-md">

          <h1 className="text-3xl font-semibold text-gray-800 text-center">Create Account</h1>
          <p className="text-gray-500 text-center mt-1 mb-6">Join Uniedu today</p>

          {!role ? (
            <RoleSelector setRole={setRole} />
          ) : (
            <>
              <label className="text-gray-700 text-sm">Email</label>
              <input
                type="email"
                className="w-full mt-1 mb-4 px-4 py-2 border rounded-xl focus:ring focus:ring-blue-200"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
              />

              <label className="text-gray-700 text-sm">Password</label>
              <input
                type="password"
                className="w-full mt-1 mb-4 px-4 py-2 border rounded-xl focus:ring focus:ring-blue-200"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
              />

              <button
                onClick={handleRegister}
                className="w-full py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
              >
                Create Account
              </button>

              <p className="text-center text-sm mt-5 text-gray-600">
                Already have an account?{" "}
                <a href="/" className="text-blue-600 font-semibold">
                  Login
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
