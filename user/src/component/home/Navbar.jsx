import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [openMenu, setOpenMenu] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const profileRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Active link style
  const isActive = (path) =>
    location.pathname === path
      ? "text-blue-600 font-semibold"
      : "hover:text-blue-600";

  // ✅ Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Logout
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
        localStorage.clear();
        navigate("/login");
      }
    });
  };

  return (
    <nav className="w-full bg-white/90 backdrop-blur shadow fixed top-0 left-0 z-50">
      <div className="max-w-[1300px] mx-auto px-6 py-3 flex items-center justify-between">

        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer hover:scale-105 transition"
        >
          <img src="/src/assets/logo.png" className="w-8" alt="Logo" />
          <h1 className="text-2xl font-bold text-blue-700">Get-Skillz</h1>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          <Link to="/" className={isActive("/")}>Home</Link>

          <Link to="/ExploreCourses" className={isActive("/ExploreCourses")}>
            Explore Courses
          </Link>

          <Link to="/my-courses" className={isActive("/my-courses")}>
            My Learning
          </Link>

          {/* PROFILE */}
          <div className="relative" ref={profileRef}>
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
              <div className="absolute right-0 mt-3 bg-white shadow-xl rounded-xl w-52 py-2 border animate-fadeIn">

                {/* USER INFO */}
                <div className="px-4 py-3 border-b">
                  <p className="text-sm font-semibold text-gray-800">
                    {user?.name || "Student"}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>

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

        {/* MOBILE MENU BUTTON */}
        <button className="md:hidden" onClick={() => setOpenMenu(!openMenu)}>
          {openMenu ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {openMenu && (
        <div className="md:hidden bg-white shadow-lg py-6 px-6 flex flex-col gap-5 text-gray-700 font-medium animate-fadeIn">
          <Link to="/" onClick={() => setOpenMenu(false)}>Home</Link>
          <Link to="/ExploreCourses" onClick={() => setOpenMenu(false)}>Explore Courses</Link>
          <Link to="/my-courses" onClick={() => setOpenMenu(false)}>My Learning</Link>
          <hr />
          <button onClick={() => navigate("/profile")} className="text-left">
            Profile
          </button>
          <button onClick={handleLogout} className="text-left text-red-600">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
