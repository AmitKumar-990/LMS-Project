import { useEffect, useState } from "react";
import { getMyEnrollments } from "../api/enrollmentAPI";
import { useNavigate } from "react-router-dom";

export default function MyEnrollments() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await getMyEnrollments();
      setCourses(data);
    })();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">My Courses</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {courses.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 shadow">
            <img
              src={item.course.thumbnailUrl}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-lg font-semibold mt-3">
              {item.course.title}
            </h2>

            <button
              onClick={() =>
                navigate(`/course/${item.course._id}/content`)
              }
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Continue Learning
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
