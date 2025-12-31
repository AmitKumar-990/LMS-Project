import { useState } from "react";
import Swal from "sweetalert2";
import { updateCourse } from "../../api/courseAPI";
import ThumbnailUploader from "../ThumbnailUploader";

export default function OverviewTab({ course, refresh }) {
  const [form, setForm] = useState({
    title: course.title || "",
    description: course.description || "",
    category: course.category || "",
    price: course.price || 0,
    thumbnailUrl: course.thumbnailUrl || "",
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleThumbnail = (url) =>
    setForm({ ...form, thumbnailUrl: url });

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateCourse(course._id, form);
      Swal.fire({
        icon: "success",
        title: "Course Updated",
        timer: 1500,
        showConfirmButton: false,
      });
      await refresh();
    } catch (err) {
      Swal.fire(err.response?.data?.message || "Update failed");
    }
    setSaving(false);
  };

  return (
    <div className="space-y-8">

      {/* BASIC INFO */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

        <div className="grid gap-4">
          <div>
            <label className="text-sm font-medium text-gray-600">
              Course Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter course title"
              className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Course Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              placeholder="Describe what students will learn"
              className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* CATEGORY & PRICE */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Category & Pricing</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-600">
              Category
            </label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="e.g. Web Development"
              className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Price (INR)
            </label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* THUMBNAIL */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Course Thumbnail</h2>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          <ThumbnailUploader onUpload={handleThumbnail} />

          {form.thumbnailUrl && (
            <div className="border rounded-xl overflow-hidden shadow-sm">
              <img
                src={form.thumbnailUrl}
                alt="Thumbnail"
                className="w-56 h-36 object-cover"
              />
              <p className="text-xs text-center text-gray-500 py-2">
                Current Thumbnail
              </p>
            </div>
          )}
        </div>
      </div>

      {/* SAVE BUTTON */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-8 py-3 rounded-lg text-white font-medium transition ${
            saving
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
