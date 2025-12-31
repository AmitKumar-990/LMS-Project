import { Plus, FileText, Trash2, Edit } from "lucide-react";
import InstructorSidebar from "../../component/InstructorSidebar";
import InstructorTopbar from "../../component/InstructorTopbar";

export default function ManageChapters() {
  const chapters = [
    { id: 1, title: "Introduction", lessons: 3 },
    { id: 2, title: "Setup & Installation", lessons: 5 },
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <InstructorSidebar />

      <div className="ml-64 w-full">
        <InstructorTopbar />

        <div className="p-8 max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Manage Chapters
              </h1>
              <p className="text-gray-500 mt-1">
                Organize chapters and add course content
              </p>
            </div>

            <button className="flex items-center gap-2 px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow">
              <Plus size={18} />
              Add New Chapter
            </button>
          </div>

          {/* Chapters List */}
          <div className="bg-white shadow rounded-xl divide-y">
            {chapters.length === 0 ? (
              <div className="p-10 text-center text-gray-500">
                No chapters added yet. Start by creating your first chapter.
              </div>
            ) : (
              chapters.map((ch, index) => (
                <div
                  key={ch.id}
                  className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-gray-50 transition"
                >
                  {/* Left */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 font-semibold">
                      {index + 1}
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {ch.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {ch.lessons} lessons
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      <FileText size={16} />
                      Add Content
                    </button>

                    <button className="p-2 rounded-lg border hover:bg-gray-100 transition">
                      <Edit size={16} />
                    </button>

                    <button className="p-2 rounded-lg border hover:bg-red-50 text-red-600 transition">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Tips */}
          <div className="mt-6 bg-blue-50 border border-blue-200 p-4 rounded-lg text-sm text-blue-700">
            💡 Tip: Break your course into short, clear chapters for better
            student engagement.
          </div>
        </div>
      </div>
    </div>
  );
}
