import { deleteCourse } from "../../api/courseAPI";
import { useNavigate } from "react-router-dom";

export default function SettingsTab({ course }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!confirm("This will permanently delete the course (and chapters). Are you sure?")) return;
    try {
      await deleteCourse(course._id);
      alert("Course deleted");
      navigate("/instructor/my-courses");
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="font-semibold text-lg">Course Settings</h3>

      <div className="mt-4">
        <p className="text-sm text-gray-600">Publish state, pricing and additional settings will appear here.</p>
      </div>

      <div className="mt-6">
        <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded">Delete Course Permanently</button>
      </div>
    </div>
  );
}
