import { useEffect, useState } from "react";
import { getMyEnrollments } from "../api/enrollmentAPI";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/home/Navbar";

export default function MyEnrollments() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
  const handleEnrollment = async () => {
    const courseId = localStorage.getItem("purchasedCourse");

    //CREATE ENROLLMENT (only once)
    if (courseId) {
      try {
        await fetch("http://localhost:5000/api/enrollments/confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ courseId }),
        });

        localStorage.removeItem("purchasedCourse");
      } catch (err) {
        console.error("Enrollment failed");
      }
    }

    //FETCH ENROLLMENTS
    const { data } = await getMyEnrollments();
    setCourses(data);
  };

  handleEnrollment();
}, []);

  return (
    <>
      <Navbar />
      <br></br>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 px-6 py-16">
        <div className="max-w-[1200px] mx-auto">
          {/* Page Title */}
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            My Enrollments
          </h1>

          {/* If no courses */}
          {courses.length === 0 && (
            <div className="bg-white p-10 rounded-xl shadow text-center mt-10">
              <h2 className="text-xl font-semibold text-gray-700">
                You haven't enrolled in any courses yet.
              </h2>
              <p className="text-gray-500 mt-2">
                Start learning by exploring available courses!
              </p>
              <button
                onClick={() => navigate("/ExploreCourses")}
                className="mt-5 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Browse Courses
              </button>
            </div>
          )}

          {/* Enrolled Courses */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {courses
              .filter((item) => item.course) // 🚨 skip null courses
              .map((item, idx) => (
                <div
                  key={item._id || idx}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-4 transform hover:-translate-y-1 flex flex-col"
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  {/* Thumbnail */}
                  <div className="w-full h-44 rounded-lg overflow-hidden">
                    <img
                      src={item.course.thumbnailUrl || "/default-course.png"}
                      alt={item.course.title || "Course"}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Title */}
                  <h2 className="text-lg font-semibold mt-4 text-gray-800 line-clamp-2 h-14">
                    {item.course.title}
                  </h2>

                  {/* Button */}
                  <div className="mt-auto">
                    <button
                      onClick={() =>
                        navigate(`/course/${item.course._id}/content`)
                      }
                      className="
            mt-4 w-full px-4 py-2 bg-blue-600 text-white 
            rounded-lg hover:bg-blue-700 transition
          "
                    >
                      Continue Learning
                    </button>
                  </div>
                </div>
              ))}

          </div>
        </div>
      </div>
    </>
  );
}
