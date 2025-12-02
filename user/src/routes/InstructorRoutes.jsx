import { Routes, Route } from "react-router-dom";
import InstructorRoute from "./InstructorRoute";

import Dashboard from "../Pages/instructor/Dashboard";
import MyCourses from "../Pages/instructor/MyCourse";
import AddCourse from "../Pages/instructor/AddCourse";

export default function InstructorRoutes() {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <InstructorRoute>
            <Dashboard />
          </InstructorRoute>
        }
      />

      <Route
        path="/my-courses"
        element={
          <InstructorRoute>
            <MyCourses />
          </InstructorRoute>
        }
      />

      <Route
        path="/add-course"
        element={
          <InstructorRoute>
            <AddCourse />
          </InstructorRoute>
        }
      />
    </Routes>
  );
}
