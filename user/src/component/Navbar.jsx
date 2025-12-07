import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

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

        navigate("/login");
      }
    });
  };

  return (
    <nav className="w-full bg-white shadow fixed top-0 left-0 z-50">
      <div className="max-w-[1300px] mx-auto px-6 py-3 flex items-center justify-between">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src="/src/assets/logo.png" className="w-8" alt="Logo" />
          <h1 className="text-2xl font-bold text-blue-700">Get-Skillz</h1>
        </div>

        <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600 transition">
            Home
          </Link>

          <Link to="/ExploreCourses" className="hover:text-blue-600 transition">
            Explore Courses
          </Link>

          <Link to="/my-courses" className="hover:text-blue-600 transition">
            My Learning
          </Link>

          <div className="relative">
            <button
              onClick={() => setOpenProfile(!openProfile)}
              className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:ring-2 hover:ring-blue-400 transition"
            >
              <img
                src="/src/assets/icon.jpg"
                alt="profile"
                className="w-8 h-8 rounded-full"
              />
            </button>

            {openProfile && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48 py-2 border">
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  My Profile
                </button>
                <button
                  onClick={() => navigate("/my-wishlist")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Wishlist
                </button>
                <button
                  onClick={() => navigate("/my-courses")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  My Learning
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        <button className="md:hidden" onClick={() => setOpenMenu(!openMenu)}>
          {openMenu ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {openMenu && (
        <div className="md:hidden bg-white shadow-lg py-4 px-6 flex flex-col gap-4 text-gray-700 font-medium">
          <Link
            to="/"
            onClick={() => setOpenMenu(false)}
            className="hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/ExploreCourses"
            onClick={() => setOpenMenu(false)}
            className="hover:text-blue-600"
          >
            Explore Courses
          </Link>

          <Link
            to="/my-courses"
            onClick={() => setOpenMenu(false)}
            className="hover:text-blue-600"
          >
            My Learning
          </Link>

          <button
            onClick={() => {
              setOpenMenu(false);
              navigate("/profile");
            }}
            className="hover:text-blue-600 text-left"
          >
            Profile
          </button>

          <button
            onClick={handleLogout}
            className="text-left text-red-600 hover:text-red-700"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
