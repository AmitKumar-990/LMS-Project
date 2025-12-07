import { Routes, Route } from "react-router-dom";

import Login from "../Pages/login";
import Register from "../Pages/register";
import ForgotPassword from "../Pages/ForgotPassword";
import ResetPassword from "../Pages/ResetPassword";
import Home from "../Pages/Home";
import ExploreCourses from "../Pages/ExploreCourses";

import InstructorDashboard from "../Pages/instructor/Dashboard";
import MyCourses from "../Pages/instructor/MyCourse";
import AddCourse from "../Pages/instructor/AddCourse";
import CourseEditor from "../Pages/instructor/CourseEditor";
import CourseDetails from "../Pages/CourseDetails";
import BuyCourse from "../Pages/BuyCourses";
import MyEnrollments from "../Pages/MyEnrollment";
import GoogleSuccess from "../Pages/googlesuccess";

import ProtectedRoute from "./ProtectedRoute";
import InstructorRoute from "./InstructorRoute";
// import Home from "../Pages/Home";
export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/google-success" element={<GoogleSuccess />} />
      
      <Route path="/course/:id" element={<CourseDetails />} />
      <Route path="/buy/:courseId" element={<BuyCourse />} />
      <Route path="/my-courses" element={<MyEnrollments />} />

      <Route
        path="/"
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
        path="/instructor/my-courses"
        element={
          <InstructorRoute>
            <MyCourses />
          </InstructorRoute>
        }
      />

      <Route
        path="/instructor/add-course"
        element={
          <InstructorRoute>
            <AddCourse />
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
    </Routes>
  );
}
