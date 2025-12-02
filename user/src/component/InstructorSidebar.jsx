import { Link, useLocation } from "react-router-dom";

export default function InstructorSidebar() {
  const path = useLocation().pathname;

  const role = localStorage.getItem("role");

  if (role !== "instructor") return null;

  const menu = [
    { label: "Dashboard", to: "/instructor/dashboard" },
    { label: "My Courses", to: "/instructor/my-courses" },
    { label: "Add Course", to: "/instructor/add-course" },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 p-6">
      <h1 className="text-2xl font-bold text-blue-600">Instructor</h1>

      <ul className="mt-8 space-y-4">
        {menu.map((m) => (
          <li key={m.to}>
            <Link
              to={m.to}
              className={`block px-4 py-2 rounded-lg ${
                path === m.to
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {m.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
