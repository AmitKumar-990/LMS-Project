import { useEffect, useState, useRef } from "react";
import {
  createChapter,
  updateChapter,
  deleteChapter,
} from "../../api/chapterAPI";
import { updateCourse } from "../../api/courseAPI";

/*
This component:
- shows chapter list
- allows add, edit, delete
- supports drag-and-drop ordering (native)
- on reorder it updates course.chapters order by sending array of chapter ids to updateCourse
*/

export default function ChaptersTab({ course, refresh }) {
  const [chapters, setChapters] = useState(course.chapters || []);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingDesc, setEditingDesc] = useState("");
  const draggingIndex = useRef(null);

  useEffect(() => {
    const update = () => {
      setChapters(course.chapters || []);
    };
    update();
  }, [course]);

  // Add chapter
  const handleAdd = async () => {
    if (!newTitle) return alert("Enter chapter title");
    try {
      const { data } = await createChapter({
        courseId: course._id,
        title: newTitle,
        description: newDesc,
      });
      // push to list
      const updated = [...chapters, data];
      setChapters(updated);
      setNewTitle("");
      setNewDesc("");
      // update course order on backend
      await updateCourse(course._id, { chapters: updated.map((c) => c._id) });
      await refresh();
    } catch (err) {
      alert(err.response?.data?.message || "Add failed");
    }
  };

  // Edit chapter
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
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete chapter?")) return;
    try {
      await deleteChapter(id);
      const updated = chapters.filter((c) => c._id !== id);
      setChapters(updated);
      // update course chapters array on server
      await updateCourse(course._id, { chapters: updated.map((c) => c._id) });
      await refresh();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // Drag handlers
const onDragStart = (e, _index) => {
  draggingIndex.current = _index;
  e.dataTransfer.effectAllowed = "move";
};

const onDragOver = (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
};

const onDrop = async (e, _index) => {
  e.preventDefault();
  const from = draggingIndex.current;
  const to = _index;
  if (from === null || to === null) return;

  const updated = [...chapters];
  const [moved] = updated.splice(from, 1);
  updated.splice(to, 0, moved);
  setChapters(updated);
  draggingIndex.current = null;

  try {
    await updateCourse(course._id, { chapters: updated.map((c) => c._id) });
    await refresh();
  } catch (err) {
    console.error(err);
    alert("Failed to save order");
  }
};


  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          placeholder="New chapter title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          placeholder="Short description (optional)"
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
          className="p-2 border rounded"
        />
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Add Chapter
        </button>
        <p className="text-sm text-gray-500 self-center">
          Drag & drop chapters to reorder them
        </p>
      </div>

      <div className="mt-6 space-y-3">
        {chapters.map((ch, _index) => (
          <div
            key={ch._id}
            draggable
            onDragStart={(e) => onDragStart(e, _index)}
            onDragOver={(e) => onDragOver(e, _index)}
            onDrop={(e) => onDrop(e, _index)}
            className="p-4 bg-gray-50 rounded flex justify-between items-center cursor-move"
          >
            <div>
              {editingId === ch._id ? (
                <>
                  <input
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    className="p-2 border rounded w-full"
                  />
                  <input
                    value={editingDesc}
                    onChange={(e) => setEditingDesc(e.target.value)}
                    className="p-2 border rounded w-full mt-2"
                  />
                </>
              ) : (
                <>
                  <div className="font-semibold">{ch.title}</div>
                  <div className="text-sm text-gray-600">{ch.description}</div>
                </>
              )}
            </div>

            <div className="flex gap-2">
              {editingId === ch._id ? (
                <>
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
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
