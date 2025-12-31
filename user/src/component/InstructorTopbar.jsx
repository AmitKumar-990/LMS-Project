import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { Bell, Search, LogOut, User } from "lucide-react";

export default function InstructorTopbar() {
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false);

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "You will need to login again.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Logout",
    }).then((res) => {
      if (res.isConfirmed) {
        localStorage.clear();
        navigate("/login");
      }
    });
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b shadow-sm px-6 py-4 flex items-center justify-between">

      {/* LEFT */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Instructor Dashboard
        </h2>
        <p className="text-sm text-gray-500">
          Manage courses & students
        </p>
      </div>

      {/* CENTER SEARCH
      <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-72">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search courses..."
          className="bg-transparent outline-none ml-2 w-full text-sm"
        />
      </div> */}

      {/* RIGHT */}
      <div className="flex items-center gap-5 relative">

        {/* Notification */}
        <button className="relative hover:text-blue-600 transition">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <button
          onClick={() => setOpenProfile(!openProfile)}
          className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded-lg transition"
        >
          <img
            src="/src/assets/5360344.png"
            alt="profile"
            className="w-9 h-9 rounded-full object-cover"
          />
        </button>

        {/* Dropdown */}
        {openProfile && (
          <div className="absolute right-0 top-14 bg-white border shadow-lg rounded-xl w-48 overflow-hidden">
            <button
              onClick={() => navigate("/profile")}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-left"
            >
              <User size={18} />
              My Profile
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 text-left"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
