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

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleThumbnail = (url) => setForm({ ...form, thumbnailUrl: url });

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateCourse(course._id, form);
      Swal.fire("Course updated");
      await refresh();
    } catch (err) {
      Swal.fire(err.response?.data?.message || "Update failed");
    }
    setSaving(false);
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="font-medium">Title</label>
          <input name="title" value={form.title} onChange={handleChange} className="w-full p-3 border rounded mt-2" />
          <label className="font-medium mt-4 block">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="w-full p-3 border rounded mt-2 h-40" />
        </div>

        <div>
          <label className="font-medium">Category</label>
          <input name="category" value={form.category} onChange={handleChange} className="w-full p-3 border rounded mt-2" />

          <label className="font-medium mt-4 block">Price (INR)</label>
          <input name="price" type="number" value={form.price} onChange={handleChange} className="w-full p-3 border rounded mt-2" />

          <div className="mt-4">
            <ThumbnailUploader onUpload={handleThumbnail} />
            {form.thumbnailUrl && <img src={form.thumbnailUrl} alt="thumb" className="w-40 h-28 object-cover mt-3 rounded shadow" />}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button onClick={handleSave} disabled={saving} className={`px-6 py-2 rounded text-white ${saving ? 'bg-gray-400' : 'bg-blue-600'}`}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
