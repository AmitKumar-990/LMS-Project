import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import { LogOut } from "lucide-react";

import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  LogOut,
} from "lucide-react";

export default function InstructorSidebar() {
  const { pathname } = useLocation();
  const role = localStorage.getItem("role");

  const navigate = useNavigate();

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


  if (role !== "instructor") return null;

  const menu = [
    {
      label: "Dashboard",
      to: "/instructor/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: "My Courses",
      to: "/instructor/my-courses",
      icon: <BookOpen size={20} />,
    },
    {
      label: "Add Course",
      to: "/instructor/add-course",
      icon: <PlusCircle size={20} />,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-white border-r shadow-sm flex flex-col">

      {/* LOGO / BRAND */}
      <div className="px-6 py-5 border-b">
        <h1 className="text-2xl font-bold text-blue-600">
          Get-Skillz
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Instructor Panel
        </p>
      </div>

      {/* MENU */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menu.map((item) => {
          const active = pathname === item.to;

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition
                ${active
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              <span className={`${active ? "text-white" : "text-gray-500"}`}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="px-4 py-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>
    </aside>
  );
}
