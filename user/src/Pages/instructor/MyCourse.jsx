import { useEffect, useState } from "react";
import axios from "axios";
import { PlusCircle, BookOpen, Users } from "lucide-react";

import InstructorSidebar from "../../component/InstructorSidebar";
import InstructorTopbar from "../../component/InstructorTopbar";
import CourseCardInstructor from "../../component/CourseCardInstruction";
import { useNavigate } from "react-router-dom";

export default function MyCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const instructorId = localStorage.getItem("userId");

        const res = await axios.get(
          `http://localhost:5000/api/course/instructor/${instructorId}`
        );

        setCourses(res.data.courses || []);
      } catch (err) {
        console.error("Failed to load courses", err);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <InstructorSidebar />

      <div className="ml-64 w-full">
        <InstructorTopbar />

        <div className="p-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                My Courses
              </h1>
              <p className="text-gray-500 mt-1">
                Manage, edit, and track your published courses
              </p>
            </div>

            
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
              <BookOpen className="text-blue-600" size={36} />
              <div>
                <p className="text-gray-500 text-sm">Total Courses</p>
                <h2 className="text-2xl font-bold">{courses.length}</h2>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
              <Users className="text-emerald-600" size={36} />
              <div>
                <p className="text-gray-500 text-sm">Total Enrollments</p>
                <h2 className="text-2xl font-bold">—</h2>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
              <span className="text-purple-600 text-4xl font-bold">₹</span>
              <div>
                <p className="text-gray-500 text-sm">Total Earnings</p>
                <h2 className="text-2xl font-bold">—</h2>
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          {courses.length === 0 ? (
            <div className="bg-white p-12 rounded-xl shadow text-center">
              <img
                src="/src/assets/empty-course.svg"
                alt="No courses"
                className="w-40 mx-auto mb-6"
              />
              <h2 className="text-xl font-semibold text-gray-700">
                No courses yet
              </h2>
              <p className="text-gray-500 mt-2">
                Start building your first course and share your knowledge.
              </p>
              <button
                onClick={() => navigate("/instructor/create-course")}
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Create Your First Course
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCardInstructor
                  key={course._id}
                  course={course}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
