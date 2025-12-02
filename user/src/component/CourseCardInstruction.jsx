import { useNavigate } from "react-router-dom";
import { deleteCourse } from "../api/courseAPI";

export default function CourseCardInstructor({ course, reload }) {
  const navigate = useNavigate();

  // Handle Delete
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this course permanently?")) return;

    try {
      await deleteCourse(course._id);
      alert("Course deleted");
      reload(); // Refresh My Courses list
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="border rounded-lg shadow p-4 w-80 bg-white">
      <img
        src={course.thumbnailUrl}
        alt={course.title}
        className="w-full h-40 object-cover rounded"
      />

      <h2 className="text-lg font-semibold mt-3">{course.title}</h2>

      <div className="flex gap-3 mt-4">
        {/* EDIT BUTTON → Opens Advanced Course Editor */}
        <button
          onClick={() => navigate(`/instructor/course-editor/${course._id}`)}
          className="px-4 py-1 bg-blue-600 text-white rounded"
        >
          Edit
        </button>

        {/* CHAPTERS BUTTON → Opens Editor with Chapters Tab */}
        <button
          onClick={() => navigate(`/instructor/course-editor/${course._id}?tab=Chapters`)}
          className="px-4 py-1 bg-green-600 text-white rounded"
        >
          Chapters
        </button>

        {/* DELETE BUTTON */}
        <button
          onClick={handleDelete}
          className="px-4 py-1 bg-red-600 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
