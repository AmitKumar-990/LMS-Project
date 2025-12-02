// import InstructorSidebar from "../../component/InstructorSidebar";
// import InstructorTopbar from "../../component/InstructorTopbar";

// export default function AddCourse() {
//   return (
//     <div className="flex">
//       <InstructorSidebar />
//       <div className="ml-64 w-full">
//         <InstructorTopbar />

//         <div className="p-8">
//           <h1 className="text-3xl font-semibold mb-6">Create Course</h1>

//           <div className="bg-white shadow rounded-lg p-6 space-y-5">
//             <input className="w-full p-3 border rounded" placeholder="Course Title" />
//             <textarea className="w-full p-3 border rounded" placeholder="Course Description"></textarea>
//             <input className="w-full p-3 border rounded" placeholder="Category" />
//             <input className="w-full p-3 border rounded" placeholder="Price" type="number" />
//             <input className="w-full p-3 border rounded" type="file" />

//             <button className="px-6 py-3 bg-blue-600 text-white rounded">Create Course</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { createCourse } from "../../api/courseAPI";
import { useNavigate } from "react-router-dom";
import InstructorSidebar from "../../component/InstructorSidebar";
import InstructorTopbar from "../../component/InstructorTopbar";
import ThumbnailUploader from "../../component/ThumbnailUploader";

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
      alert("Title, Description & Thumbnail are required");
      return;
    }

    try {
      await createCourse(form);
      alert("Course created successfully!");
      navigate("/instructor/my-courses");
    } catch (err) {
      alert(err.response?.data?.message || "Course creation failed");
    }
  };

  return (
    <div className="flex">
      <InstructorSidebar />
      <div className="ml-64 w-full">
        <InstructorTopbar />

        <div className="p-8">
          <h1 className="text-3xl font-semibold mb-6">Add New Course</h1>

          <div className="bg-white p-6 shadow rounded-lg space-y-5">

            {/* Title */}
            <input
              name="title"
              onChange={handleInput}
              className="w-full p-3 border rounded"
              placeholder="Course Title"
            />

            {/* Description */}
            <textarea
              name="description"
              onChange={handleInput}
              className="w-full p-3 border rounded"
              placeholder="Course Description"
            ></textarea>

            {/* Category */}
            <input
              name="category"
              onChange={handleInput}
              className="w-full p-3 border rounded"
              placeholder="Category"
            />

            {/* Price */}
            <input
              name="price"
              type="number"
              onChange={handleInput}
              className="w-full p-3 border rounded"
              placeholder="Price"
            />

            {/* Thumbnail Upload */}
            <ThumbnailUploader onUpload={handleThumbnailUploaded} />

            {/* Create Button */}
            <button
              onClick={handleCreate}
              className="px-6 py-3 bg-blue-600 text-white rounded"
            >
              Create Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
