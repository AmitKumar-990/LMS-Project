import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById } from "../api/courseAPI";
import { userIsEnrolled } from "../api/enrollmentAPI";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await getCourseById(id);
      setCourse(data);

      const enrollStatus = await userIsEnrolled(id);
      setEnrolled(enrollStatus.data.enrolled);
    })();
  }, [id]);

  if (!course) return <div>Loading...</div>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">{course.title}</h1>
      <p className="text-gray-700 mt-2">{course.description}</p>

      <img src={course.thumbnailUrl} className="w-80 mt-4 rounded shadow" />

      <div className="mt-6">
        {enrolled ? (
          <button
            onClick={() => navigate(`/course/${id}/content`)}
            className="px-6 py-3 bg-green-600 text-white rounded"
          >
            Go to Course
          </button>
        ) : (
          <button
            onClick={() => navigate(`/buy/${id}`)}
            className="px-6 py-3 bg-blue-600 text-white rounded"
          >
            Buy Now - ₹{course.price}
          </button>
        )}
      </div>
    </div>
  );
}
