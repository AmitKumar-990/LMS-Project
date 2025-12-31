import { useEffect, useState } from "react";
import { getMyEnrollments } from "../api/enrollmentAPI";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/home/Navbar";
import Footer from "../component/home/Footer"

export default function MyEnrollments() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const handleEnrollment = async () => {
      const courseId = localStorage.getItem("purchasedCourse");

      //CREATE ENROLLMENT
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
    {/* HERO SECTION */}
    <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-14 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold">
          My Learning Dashboard
        </h1>
        <p className="mt-3 text-blue-100 text-lg">
          Continue where you left off and keep building your skills.
        </p>
      </div>
    </section>

    {/* MAIN CONTENT */}
    <section className="min-h-screen bg-gray-50 px-6 py-14">
      <div className="max-w-7xl mx-auto">

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500 text-sm">Enrolled Courses</p>
            <h2 className="text-3xl font-bold text-blue-600">
              {courses.length}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500 text-sm">Learning Status</p>
            <h2 className="text-xl font-semibold text-gray-800">
              In Progress 🚀
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500 text-sm">Consistency</p>
            <h2 className="text-xl font-semibold text-green-600">
              Keep Going 💪
            </h2>
          </div>
        </div>

        {/* EMPTY STATE */}
        {courses.length === 0 && (
          <div className="bg-white p-12 rounded-2xl shadow text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              No courses yet 📭
            </h2>
            <p className="text-gray-500 mt-3">
              Start your learning journey by enrolling in a course.
            </p>
            <button
              onClick={() => navigate("/ExploreCourses")}
              className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Explore Courses
            </button>
          </div>
        )}

        {/* COURSE GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses
            .filter((item) => item.course)
            .map((item, idx) => (
              <div
                key={item._id || idx}
                className="bg-white rounded-2xl shadow hover:shadow-xl transition-all overflow-hidden flex flex-col"
              >
                {/* IMAGE */}
                <div className="h-44 overflow-hidden">
                  <img
                    src={item.course.thumbnailUrl || "/default-course.png"}
                    alt={item.course.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                    {item.course.title}
                  </h3>

                  {/* FAKE PROGRESS SHOWN (can be real later)
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>In Progress</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full w-1/3"></div>
                    </div>
                  </div> */}

                  {/* CTA */}
                  <button
                    onClick={() =>
                      navigate(`/course/${item.course._id}/content`)
                    }
                    className="mt-auto mt-6 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Continue Learning →
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>

    <Footer />
  </>
);
}
