import InstructorSidebar from "../../component/InstructorSidebar";
import InstructorTopbar from "../../component/InstructorTopbar";

export default function AddContent() {
  return (
    <div className="flex">
      <InstructorSidebar />
      <div className="ml-64 w-full">
        <InstructorTopbar />

        <div className="p-8">
          <h1 className="text-3xl font-semibold">Add Chapter Content</h1>

          <div className="bg-white p-6 shadow rounded-lg space-y-4 mt-6">
            <select className="w-full p-3 border rounded">
              <option>Content Type</option>
              <option value="video">Video</option>
              <option value="pdf">PDF</option>
              <option value="text">Text</option>
            </select>

            <input className="w-full p-3 border rounded" placeholder="Content Title" />
            <textarea className="w-full p-3 border rounded" placeholder="Description"></textarea>
            <button className="px-6 py-3 bg-blue-600 text-white rounded">
              Save Content
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
