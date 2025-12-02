import InstructorSidebar from "../../component/InstructorSidebar";
import InstructorTopbar from "../../component/InstructorTopbar";

export default function ManageChapters() {
  const chapters = [
    { id: 1, title: "Introduction" },
    { id: 2, title: "Setup & Installation" },
  ];

  return (
    <div className="flex">
      <InstructorSidebar />
      <div className="ml-64 w-full">
        <InstructorTopbar />

        <div className="p-8">
          <h1 className="text-3xl font-semibold">Manage Chapters</h1>

          <div className="mt-6 bg-white p-6 shadow rounded-lg space-y-4">
            {chapters.map((ch) => (
              <div
                key={ch.id}
                className="flex justify-between bg-gray-50 p-4 rounded-lg"
              >
                <p>{ch.title}</p>
                <button className="px-4 py-1 bg-blue-600 text-white rounded">
                  Add Content
                </button>
              </div>
            ))}

            <button className="px-6 py-3 bg-green-600 text-white rounded mt-4">
              Add New Chapter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
