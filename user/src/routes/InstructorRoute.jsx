import { Navigate } from "react-router-dom";

export default function InstructorRoute({ children }) {
  const role = localStorage.getItem("role");

  if (role !== "instructor") {
    return <Navigate to="/home" replace />;  //login
  }

  return children;
}
