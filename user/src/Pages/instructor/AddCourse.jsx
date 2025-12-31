import { useState } from "react";
import { createCourse } from "../../api/courseAPI";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import InstructorSidebar from "../../component/InstructorSidebar";
import InstructorTopbar from "../../component/InstructorTopbar";
import ThumbnailUploader from "../../component/ThumbnailUploader";
import { BookOpen, IndianRupee } from "lucide-react";

export default function AddCourse() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    thumbnailUrl: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleThumbnailUploaded = (url) => {
    setForm({ ...form, thumbnailUrl: url });
  };

  const handleCreate = async () => {
    if (!form.title || !form.description || !form.thumbnailUrl) {
      Swal.fire("Title, Description & Thumbnail are required");
      return;
    }

    try {
      await createCourse(form);
      Swal.fire({
        icon: "success",
        title: "Course Created!",
        text: "You can now add chapters and content.",
      });
      navigate("/instructor/my-courses");
    } catch (err) {
      Swal.fire(err.response?.data?.message || "Course creation failed");
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <InstructorSidebar />

      <div className="ml-64 w-full">
        <InstructorTopbar />

        <div className="p-8 max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Create a New Course
            </h1>
            <p className="text-gray-500 mt-1">
              Provide basic details to get started. You can add lessons later.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Info Panel */}
            <div className="bg-white rounded-xl shadow p-6 h-fit">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <BookOpen size={20} className="text-blue-600" />
                Course Guidelines
              </h3>

              <ul className="space-y-3 text-gray-600 text-sm">
                <li>• Choose a clear & specific course title</li>
                <li>• Write a detailed and informative description</li>
                <li>• Upload a high-quality thumbnail</li>
                <li>• Set a reasonable price</li>
              </ul>

              {form.thumbnailUrl && (
                <div className="mt-6">
                  <p className="text-sm font-medium mb-2">
                    Thumbnail Preview
                  </p>
                  <img
                    src={form.thumbnailUrl}
                    alt="Thumbnail"
                    className="rounded-lg shadow"
                  />
                </div>
              )}
            </div>

            {/* Form Section */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow p-8 space-y-6">
              {/* Title */}
              <div>
                <label className="block font-medium mb-1">
                  Course Title
                </label>
                <input
                  name="title"
                  onChange={handleInput}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g. Complete MERN Stack Bootcamp"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block font-medium mb-1">
                  Course Description
                </label>
                <textarea
                  name="description"
                  onChange={handleInput}
                  rows={4}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="What students will learn in this course..."
                />
              </div>

              {/* Category & Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium mb-1">
                    Category
                  </label>
                  <input
                    name="category"
                    onChange={handleInput}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="e.g. Web Development"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">
                    Price (₹)
                  </label>
                  <div className="relative">
                    <IndianRupee
                      className="absolute left-3 top-3 text-gray-400"
                      size={18}
                    />
                    <input
                      name="price"
                      type="number"
                      onChange={handleInput}
                      className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="499"
                    />
                  </div>
                </div>
              </div>

              {/* Thumbnail */}
              <div>
                <label className="block font-medium mb-2">
                  {/* Course Thumbnail */}
                </label>
                <ThumbnailUploader onUpload={handleThumbnailUploaded} />
              </div>

              {/* Action Button */}
              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleCreate}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition"
                >
                  Create Course
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
