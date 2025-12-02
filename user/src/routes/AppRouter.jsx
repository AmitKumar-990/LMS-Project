import { Routes, Route } from "react-router-dom";

import Login from "../Pages/login";
import Register from "../Pages/register";
import ForgotPassword from "../Pages/ForgotPassword";
import ResetPassword from "../Pages/ResetPassword";
import Home from "../Pages/Home";
import ExploreCourses from "../Pages/ExploreCourses";
import InstructorDashboard from "../Pages/instructor/Dashboard";
import MyCourses from "../Pages/instructor/MyCourse";
import CourseEditor from "../Pages/instructor/CourseEditor";
import ProtectedRoute from "./ProtectedRoute";
import InstructorRoute from "./InstructorRoute";

export default function AppRouter() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ExploreCourses"
        element={
          <ProtectedRoute>
            <ExploreCourses />
          </ProtectedRoute>
        }
      />

      <Route
        path="/instructor/dashboard"
        element={
          <InstructorRoute>
            <InstructorDashboard />
          </InstructorRoute>
        }
      />

      <Route
        path="/instructor/course-editor/:id"
        element={
          <InstructorRoute>
            <CourseEditor />
          </InstructorRoute>
        }
      />

      <Route
        path="/instructor/my-courses"
        element={
          <InstructorRoute>
            <MyCourses />
          </InstructorRoute>
        }
      />
    </Routes>
  );
}
