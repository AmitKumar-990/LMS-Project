import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authAPI";
import RoleSelector from "../component/roleselector";

export default function Register() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      // const { data } = 
      await registerUser({
        name,
        email,
        password,
        role,
      });

      alert("Account created successfully!");
      navigate("/");   // redirect to login page
    } catch (err) {
      alert(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* Left Illustration */}
      <div className="hidden md:flex bg-gray-100 items-center justify-center">
        <img src="/src/assets/1.png" className="w-4/5 rounded-3xl" />
      </div>

      {/* Right Form */}
      <div className="flex items-center justify-center px-10">
        <div className="w-full max-w-md">

          <h1 className="text-3xl font-semibold text-gray-800 text-center">
            Create Account
          </h1>

          {!role ? (
            <RoleSelector setRole={setRole} />
          ) : (
            <>
              <input
                type="text"
                placeholder="Name"
                className="w-full mt-4 px-4 py-2 border rounded-lg"
                onChange={(e) => setName(e.target.value)}
              />

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
                onClick={handleRegister}
                className="w-full mt-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Create Account
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
