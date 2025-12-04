import { useNavigate } from "react-router-dom";

export default function InstructorTopbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="w-full bg-white shadow px-8 py-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-gray-800">
        Instructor Dashboard
      </h2>

      <div className="flex items-center gap-4">
        <img
          src="https://i.pravatar.cc/40"
          className="w-10 h-10 rounded-full"
        />

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
