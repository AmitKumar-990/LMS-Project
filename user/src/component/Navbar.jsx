import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login"); // works now
  };

  return (
    <nav className="w-full flex items-center justify-between px-10 py-4 bg-white shadow-sm fixed top-0 z-50">
      <div className="flex items-center gap-2">
        <img src="/src/assets/logo.png" className="w-8" alt="Logo" />
        <h1 className="text-2xl font-bold text-blue-700">Get-Skillz</h1>
      </div>

      <div className="hidden md:flex gap-8 text-gray-600 font-medium">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <Link to="/ExploreCourses" className="hover:text-blue-600">Courses</Link>
        <a href="#Plans" className="hover:text-blue-600">Plans & Pricing</a>
        <a href="#mylearning" className="hover:text-blue-600">My Learning</a>
      </div>

      <button
        onClick={handleLogout}
        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Sign Out
      </button>
    </nav>
  );
}
