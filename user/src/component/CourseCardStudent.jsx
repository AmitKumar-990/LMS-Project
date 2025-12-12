import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userIsEnrolled } from "../api/enrollmentAPI";

export default function CourseCardStudent({ course }) {
  const navigate = useNavigate();
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await userIsEnrolled(course._id);
        setEnrolled(res.data?.enrolled || false);
      } catch { /* empty */ }
    })();
  }, [course]);

  return (
    <div
      onClick={() => navigate(`/course/${course._id}`)}
      className="
        bg-white border rounded-xl shadow 
        hover:shadow-xl hover:-translate-y-1 
        transition cursor-pointer flex flex-col
      "
    >
      {/* Thumbnail */}
      <div className="w-full h-40 overflow-hidden rounded-t-xl">
        <img
          src={course.thumbnailUrl}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Body */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title (clamped to 2 lines) */}
        <h3 className="text-lg font-semibold line-clamp-2 h-14">
          {course.title}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          By {course.instructor?.name || "Instructor"}
        </p>

        {/* Price */}
        <div className="mt-3 text-xl font-bold text-gray-900">
          ₹{course.price}
        </div>

        {/* Buttons at bottom always */}
        <div className="mt-auto pt-4 flex gap-2">
          {enrolled ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/course/${course._id}/content`);
              }}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Go to Course
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/buy/${course._id}`);
              }}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Buy Now
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/course/${course._id}`);
            }}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}
