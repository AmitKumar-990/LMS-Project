import { Routes, Route } from "react-router-dom";

import Login from "../Pages/login";
import Register from "../Pages/register";
import ForgotPassword from "../Pages/ForgotPassword";
import ResetPassword from "../Pages/ResetPassword";
import Home from "../Pages/Home";

import AboutUs from "../Pages/footer/AboutUs";
import Careers from "../Pages/footer/Careers";
import Blog from "../Pages/footer/Blog";
import Reviews from "../Pages/footer/Reviews";
import HelpCenter from "../Pages/footer/HelpCenter";
import Terms from "../Pages/footer/Term";
import Privacy from "../Pages/footer/Privacy";

import ExploreCourses from "../Pages/ExploreCourses";

import InstructorDashboard from "../Pages/instructor/Dashboard";
import MyCourses from "../Pages/instructor/MyCourse";
import AddCourse from "../Pages/instructor/AddCourse";
import CourseEditor from "../Pages/instructor/CourseEditor";
import CourseDetails from "../Pages/CourseDetails";
import BuyCourse from "../Pages/BuyCourses";
import PaymentSuccess from "../Pages/PaymentSuccess";
import MyEnrollments from "../Pages/MyEnrollment";
import CoursePlayer from "../Pages/CoursePlayer";
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
      <Route path="/course/:id/content" element={<CoursePlayer />} />
      <Route path="/buy/:courseId" element={<BuyCourse />} />
      
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/my-courses" element={<MyEnrollments />} />

      <Route path="/about" element={<AboutUs />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/help" element={<HelpCenter />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />


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
