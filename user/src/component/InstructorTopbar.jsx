import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function InstructorTopbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
  Swal.fire({
    title: "Are you sure you want to logout?",
    text: "You will need to log in again.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Logout",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      localStorage.clear();

      navigate("/login");
    }
  });
};

  return (
    <div className="w-full bg-white shadow px-8 py-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-gray-800">
        Instructor Dashboard
      </h2>

      <div className="flex items-center gap-4">
        <img
          src="/src/assets/5360344.png"
          // src="https://i.pravatar.cc/40"
          className="w-10 h-10 rounded-full"
        />

        <button
          onClick={handleLogout}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
