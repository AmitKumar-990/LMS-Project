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

    queueMicrotask(() => setChapters([...course.chapters]));
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
    const confirm = await Swal.fire({
      title: "Delete Chapter?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      await deleteChapter(id);
      const updated = chapters.filter((c) => c._id !== id);
      setChapters(updated);

      await updateCourse(course._id, { chapters: updated.map((c) => c._id) });
      await refresh();

      Swal.fire("Deleted", "Chapter removed.", "success");
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
    } catch {
      Swal.fire("Order update failed");
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
        thumbnailUrl,
        videoDuration: duration,
      });

      setUploading(chapterId, { uploading: false, progress: 100 });
      await refresh();

      Swal.fire("Video uploaded");
    } catch (err) {
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
      setUploading(chapterId, { uploadingPdf: false });

      await refresh();
      Swal.fire("PDF uploaded");
    } catch (err) {
      setUploading(chapterId, { uploadingPdf: false });
      Swal.fire(err.response?.data?.message || "PDF upload failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="bg-gray-50 p-5 rounded-xl border mb-8">
        <h3 className="text-lg font-semibold mb-3">Add New Chapter</h3>

        <div className="grid gap-3">
          <input
            placeholder="Chapter title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="p-3 border rounded-lg"
          />

          <textarea
            placeholder="Chapter description"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            className="p-3 border rounded-lg"
            rows={4}
          />

          <button
            onClick={handleAdd}
            className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Add Chapter
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {chapters.map((ch, idx) => {
          const st = uploadState[ch._id] || {};

          return (
            <div
              key={ch._id}
              className="border p-5 rounded-xl bg-gray-50 shadow-sm"
            >
              <div className="flex justify-between gap-4">
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
                        rows={3}
                        className="p-2 border rounded w-full"
                      />
                    </>
                  ) : (
                    <>
                      <h3 className="font-semibold text-lg">{ch.title}</h3>
                      <p className="text-gray-700 mt-1 whitespace-pre-line">
                        {ch.description}
                      </p>

                      <div className="mt-3 flex gap-4">
                        {ch.thumbnailUrl && (
                          <img
                            src={ch.thumbnailUrl}
                            className="w-32 h-20 object-cover rounded"
                          />
                        )}

                        {ch.videoUrl && (
                          <a
                            href={ch.videoUrl}
                            target="_blank"
                            className="text-blue-600 underline"
                          >
                            Preview Video
                          </a>
                        )}
                      </div>

                      {ch.pdfUrl && (
                        <a
                          href={ch.pdfUrl}
                          target="_blank"
                          className="text-indigo-600 underline mt-2 block"
                        >
                          View PDF
                        </a>
                      )}
                    </>
                  )}
                </div>

                <div className="flex flex-col items-end gap-2">
                  {editingId === ch._id ? (
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 bg-blue-600 text-white rounded"
                        onClick={saveEdit}
                      >
                        Save
                      </button>
                      <button
                        className="px-3 py-1 bg-gray-300 rounded"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
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
                  )}

                  <div className="mt-3 text-right">
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

                    {st.uploading && (
                      <div className="mt-2 w-full">
                        <div className="h-2 bg-gray-200 rounded">
                          <div
                            className="h-2 bg-blue-600 rounded"
                            style={{ width: `${st.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {st.progress}%
                        </p>
                      </div>
                    )}

                    <label className="text-sm text-gray-600 mt-3 block">
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

                  {/* Reorder */}
                  <div className="mt-3 flex gap-2">
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
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
