import { useNavigate } from "react-router-dom";

export default function CourseCard({ course }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/course/${course.id}`)}
      className="bg-white rounded-xl shadow hover:shadow-xl transition cursor-pointer border border-gray-100 h-[350px] flex flex-col"
    >
      <div className="h-[160px] w-full overflow-hidden rounded-t-xl">
        <img src={course.img} alt="" className="h-full w-full object-cover" />
      </div>

      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 leading-tight">
            {course.title}
          </h3>

          <p className="text-gray-500 text-sm mt-1">{course.instructor}</p>

          <div className="flex items-center gap-1 mt-2 text-yellow-500 text-sm">
            ★★★★☆ <span className="text-gray-500">(4.4)</span>
          </div>
        </div>

        <p className="mt-3 font-bold text-blue-600">₹{course.price}</p>
      </div>
    </div>
  );
}
