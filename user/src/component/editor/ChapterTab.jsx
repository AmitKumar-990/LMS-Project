// import { useEffect, useState, useRef } from "react";
// import Swal from "sweetalert2";
// import {
//   createChapter,
//   updateChapter,
//   deleteChapter,
// } from "../../api/chapterAPI";
// import { updateCourse } from "../../api/courseAPI";

// export default function ChaptersTab({ course, refresh }) {
//   const [chapters, setChapters] = useState(course.chapters || []);
//   const [newTitle, setNewTitle] = useState("");
//   const [newDesc, setNewDesc] = useState("");
//   const [editingId, setEditingId] = useState(null);
//   const [editingTitle, setEditingTitle] = useState("");
//   const [editingDesc, setEditingDesc] = useState("");
//   const draggingIndex = useRef(null);

//   useEffect(() => {
//     const update = () => {
//       setChapters(course.chapters || []);
//     };
//     update();
//   }, [course]);

//   const handleAdd = async () => {
//     if (!newTitle) return Swal.fire("Enter chapter title");
//     try {
//       const { data } = await createChapter({
//         courseId: course._id,
//         title: newTitle,
//         description: newDesc,
//       });

//       const updated = [...chapters, data];
//       setChapters(updated);
//       setNewTitle("");
//       setNewDesc("");
//       // update course order on backend
//       await updateCourse(course._id, { chapters: updated.map((c) => c._id) });
//       await refresh();
//     } catch (err) {
//       Swal.fire(err.response?.data?.message || "Add failed");
//     }
//   };

//   // Edit chapter
//   const startEdit = (ch) => {
//     setEditingId(ch._id);
//     setEditingTitle(ch.title);
//     setEditingDesc(ch.description || "");
//   };
//   const saveEdit = async () => {
//     try {
//       await updateChapter(editingId, {
//         title: editingTitle,
//         description: editingDesc,
//       });
//       const updated = chapters.map((c) =>
//         c._id === editingId
//           ? { ...c, title: editingTitle, description: editingDesc }
//           : c
//       );
//       setChapters(updated);
//       setEditingId(null);
//       await refresh();
//     } catch (err) {
//       Swal.fire(err.response?.data?.message || "Update failed");
//     }
//   };

//   const handleDelete = async (id) => {
//   Swal.fire({
//     title: "Are you sure?",
//     text: "This chapter will be permanently deleted!",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonText: "Yes, delete it",
//     cancelButtonText: "Cancel",
//   }).then(async (result) => {
//     if (result.isConfirmed) {
//       try {
//         await deleteChapter(id);

//         const updated = chapters.filter((c) => c._id !== id);
//         setChapters(updated);

//         await updateCourse(course._id, {
//           chapters: updated.map((c) => c._id),
//         });

//         await refresh();

//         Swal.fire({
//           title: "Deleted!",
//           text: "Chapter deleted successfully.",
//           icon: "success",
//         });
//       } catch (err) {
//         console.error(err);
//         Swal.fire({
//           title: "Error",
//           text: err.response?.data?.message || "Delete failed",
//           icon: "error",
//         });
//       }
//     }
//   });
// };

// const onDragStart = (e, _index) => {
//   draggingIndex.current = _index;
//   e.dataTransfer.effectAllowed = "move";
// };

// const onDragOver = (e) => {
//   e.preventDefault();
//   e.dataTransfer.dropEffect = "move";
// };

// const onDrop = async (e, _index) => {
//   e.preventDefault();
//   const from = draggingIndex.current;
//   const to = _index;
//   if (from === null || to === null) return;

//   const updated = [...chapters];
//   const [moved] = updated.splice(from, 1);
//   updated.splice(to, 0, moved);
//   setChapters(updated);
//   draggingIndex.current = null;

//   try {
//     await updateCourse(course._id, { chapters: updated.map((c) => c._id) });
//     await refresh();
//   } catch (err) {
//     console.error(err);
//     Swal.fire("Failed to save order");
//   }
// };

//   return (
//     <div className="bg-white p-6 rounded shadow">
//       <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-3">
//         <input
//           placeholder="New chapter title"
//           value={newTitle}
//           onChange={(e) => setNewTitle(e.target.value)}
//           className="p-2 border rounded"
//         />
//         <input
//           placeholder="Short description (optional)"
//           value={newDesc}
//           onChange={(e) => setNewDesc(e.target.value)}
//           className="p-2 border rounded"
//         />
//       </div>
//       <div className="flex gap-3">
//         <button
//           onClick={handleAdd}
//           className="px-4 py-2 bg-green-600 text-white rounded"
//         >
//           Add Chapter
//         </button>
//         <p className="text-sm text-gray-500 self-center">
//           Drag & drop chapters to reorder them
//         </p>
//       </div>

//       <div className="mt-6 space-y-3">
//         {chapters.map((ch, _index) => (
//           <div
//             key={ch._id}
//             draggable
//             onDragStart={(e) => onDragStart(e, _index)}
//             onDragOver={(e) => onDragOver(e, _index)}
//             onDrop={(e) => onDrop(e, _index)}
//             className="p-4 bg-gray-50 rounded flex justify-between items-center cursor-move"
//           >
//             <div>
//               {editingId === ch._id ? (
//                 <>
//                   <input
//                     value={editingTitle}
//                     onChange={(e) => setEditingTitle(e.target.value)}
//                     className="p-2 border rounded w-full"
//                   />
//                   <input
//                     value={editingDesc}
//                     onChange={(e) => setEditingDesc(e.target.value)}
//                     className="p-2 border rounded w-full mt-2"
//                   />
//                 </>
//               ) : (
//                 <>
//                   <div className="font-semibold">{ch.title}</div>
//                   <div className="text-sm text-gray-600">{ch.description}</div>
//                 </>
//               )}
//             </div>

//             <div className="flex gap-2">
//               {editingId === ch._id ? (
//                 <>
//                   <button
//                     onClick={saveEdit}
//                     className="px-3 py-1 bg-blue-600 text-white rounded"
//                   >
//                     Save
//                   </button>
//                   <button
//                     onClick={() => setEditingId(null)}
//                     className="px-3 py-1 bg-gray-300 rounded"
//                   >
//                     Cancel
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <button
//                     onClick={() => startEdit(ch)}
//                     className="px-3 py-1 bg-yellow-400 rounded"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(ch._id)}
//                     className="px-3 py-1 bg-red-600 text-white rounded"
//                   >
//                     Delete
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  createChapter,
  updateChapter,
  deleteChapter,
} from "../../api/chapterAPI";
import { updateCourse } from "../../api/courseAPI";
import { uploadVideo, uploadPDF } from "/src/api/contentAPI.js";

export default function ChaptersTab({ course, refresh }) {
  const [chapters, setChapters] = useState(course.chapters || []);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingDesc, setEditingDesc] = useState("");

  const [uploadState, setUploadState] = useState({}); 

  useEffect(() => {
    if (!course?.chapters) return;

    Promise.resolve().then(() => {
      setChapters([...course.chapters]);
    });
  }, [course?.chapters]);

  const setUploading = (chapterId, data) => {
    setUploadState((prev) => ({
      ...prev,
      [chapterId]: { ...(prev[chapterId] || {}), ...data },
    }));
  };

  const handleAdd = async () => {
    if (!newTitle) return Swal.fire("Enter chapter title");

    try {
      const { data } = await createChapter({
        courseId: course._id,
        title: newTitle,
        description: newDesc,
      });

      const updated = [...chapters, data];
      setChapters(updated);
      setNewTitle("");
      setNewDesc("");

      await updateCourse(course._id, { chapters: updated.map((c) => c._id) });
      await refresh(); 
      Swal.fire({ icon: "success", title: "Chapter added" });
    } catch (err) {
      Swal.fire(err.response?.data?.message || "Add failed");
    }
  };

  const startEdit = (ch) => {
    setEditingId(ch._id);
    setEditingTitle(ch.title);
    setEditingDesc(ch.description || "");
  };

  const saveEdit = async () => {
    try {
      await updateChapter(editingId, {
        title: editingTitle,
        description: editingDesc,
      });
      const updated = chapters.map((c) =>
        c._id === editingId
          ? { ...c, title: editingTitle, description: editingDesc }
          : c
      );
      setChapters(updated);
      setEditingId(null);
      await refresh();
      Swal.fire({ icon: "success", title: "Chapter updated" });
    } catch (err) {
      Swal.fire(err.response?.data?.message || "Update failed");
    }
  };

  const handleDelete = async (id) => {
    const r = await Swal.fire({
      title: "Are you sure?",
      text: "This chapter will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
    });
    if (!r.isConfirmed) return;

    try {
      await deleteChapter(id);
      const updated = chapters.filter((c) => c._id !== id);
      setChapters(updated);
      await updateCourse(course._id, { chapters: updated.map((c) => c._id) });
      await refresh();
      Swal.fire("Deleted!", "Chapter deleted successfully.", "success");
    } catch (err) {
      Swal.fire(err.response?.data?.message || "Delete failed");
    }
  };

  const moveChapter = async (index, dir) => {
    const updated = [...chapters];
    const to = dir === "up" ? index - 1 : index + 1;
    if (to < 0 || to >= updated.length) return;
    const [moved] = updated.splice(index, 1);
    updated.splice(to, 0, moved);
    setChapters(updated);
    try {
      await updateCourse(course._id, { chapters: updated.map((c) => c._id) });
      await refresh();
    } catch (err) {
      console.error(err);
      Swal.fire("Could not reorder chapters");
    }
  };

  const handleVideoUpload = async (chapterId, file) => {
    if (!file) return;
    const form = new FormData();
    form.append("file", file);

    try {
      setUploading(chapterId, { uploading: true, progress: 0 });
      const res = await uploadVideo(form, (evt) => {
        const percent = Math.round((evt.loaded * 100) / evt.total);
        setUploading(chapterId, { progress: percent });
      });

      const { url, thumbnailUrl, duration } = res.data;
      await updateChapter(chapterId, {
        videoUrl: url,
        thumbnailUrl: thumbnailUrl,
        videoDuration: duration,
      });

      setUploading(chapterId, {
        uploading: false,
        progress: 100,
        videoUrl: url,
        thumbnailUrl,
        videoDuration: duration,
      });

      await refresh();
      Swal.fire("Video uploaded");
    } catch (err) {
      console.error(err);
      setUploading(chapterId, { uploading: false });
      Swal.fire(err.response?.data?.message || "Video upload failed");
    }
  };

  const handlePDFUpload = async (chapterId, file) => {
    if (!file) return;
    const form = new FormData();
    form.append("file", file);

    try {
      setUploading(chapterId, { uploadingPdf: true });
      const res = await uploadPDF(form);
      const { url } = res.data;
      await updateChapter(chapterId, { pdfUrl: url });
      setUploading(chapterId, { uploadingPdf: false, pdfUrl: url });
      await refresh();
      Swal.fire("PDF uploaded");
    } catch (err) {
      console.error(err);
      setUploading(chapterId, { uploadingPdf: false });
      Swal.fire(err.response?.data?.message || "PDF upload failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="mb-6 grid grid-cols-1 gap-3">
        <input
          placeholder="New chapter title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="p-3 border rounded"
        />

        <textarea
          placeholder="Chapter description (detailed). You can add full content here."
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
          rows={4}
          className="p-3 border rounded resize-vertical"
        />
        <div className="flex gap-3">
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Add Chapter
          </button>
          <p className="text-sm text-gray-500 self-center">
            Chapters will be shown in order. Use arrows to reorder.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {chapters.map((ch, idx) => {
          const st = uploadState[ch._id] || {};
          return (
            <div key={ch._id} className="p-4 bg-gray-50 rounded">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {editingId === ch._id ? (
                    <>
                      <input
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        className="p-2 border rounded w-full mb-2"
                      />
                      <textarea
                        value={editingDesc}
                        onChange={(e) => setEditingDesc(e.target.value)}
                        rows={4}
                        className="p-2 border rounded w-full"
                      />
                    </>
                  ) : (
                    <>
                      <div className="font-semibold">{ch.title}</div>
                      <div className="text-sm text-gray-700 mt-1 whitespace-pre-line">
                        {ch.description}
                      </div>
                      {ch.thumbnailUrl || ch.videoUrl ? (
                        <div className="mt-3 flex items-center gap-3">
                          {ch.thumbnailUrl ? (
                            <img
                              src={ch.thumbnailUrl}
                              alt="thumb"
                              className="w-36 h-20 object-cover rounded"
                            />
                          ) : null}
                          {ch.videoUrl ? (
                            <a
                              href={ch.videoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-600 underline"
                            >
                              Open Video
                            </a>
                          ) : null}
                        </div>
                      ) : null}

                      {ch.pdfUrl ? (
                        <div className="mt-2">
                          <a
                            href={ch.pdfUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-indigo-600 underline"
                          >
                            View PDF
                          </a>
                        </div>
                      ) : null}
                    </>
                  )}
                </div>

                <div className="flex flex-col items-end gap-2">
                  {editingId === ch._id ? (
                    <>
                      <div className="flex gap-2">
                        <button
                          onClick={saveEdit}
                          className="px-3 py-1 bg-blue-600 text-white rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-3 py-1 bg-gray-300 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(ch)}
                          className="px-3 py-1 bg-yellow-400 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(ch._id)}
                          className="px-3 py-1 bg-red-600 text-white rounded"
                        >
                          Delete
                        </button>
                      </div>

                      <div className="mt-3 flex flex-col gap-2 items-end w-full">
                        <label className="text-sm text-gray-600">
                          Upload Video
                        </label>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => {
                            const f = e.target.files[0];
                            if (f) handleVideoUpload(ch._id, f);
                            e.target.value = null;
                          }}
                          className="text-sm"
                        />

                        {st.uploading ? (
                          <div className="w-full mt-2">
                            <div className="w-full bg-gray-200 h-2 rounded">
                              <div
                                className="bg-blue-600 h-2 rounded"
                                style={{ width: `${st.progress || 0}%` }}
                              />
                            </div>
                            <div className="text-xs text-gray-600 mt-1">
                              {st.progress || 0}%
                            </div>
                          </div>
                        ) : null}

                        <label className="text-sm text-gray-600 mt-2">
                          Upload PDF
                        </label>
                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={(e) => {
                            const f = e.target.files[0];
                            if (f) handlePDFUpload(ch._id, f);
                            e.target.value = null;
                          }}
                        />
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <button
                          onClick={() => moveChapter(idx, "up")}
                          className="px-2 py-1 bg-gray-200 rounded"
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => moveChapter(idx, "down")}
                          className="px-2 py-1 bg-gray-200 rounded"
                        >
                          ↓
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
