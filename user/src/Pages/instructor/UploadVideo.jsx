import InstructorSidebar from "../../components/InstructorSidebar";
import InstructorTopbar from "../../components/InstructorTopbar";

export default function UploadVideo() {
  return (
    <div className="flex">
      <InstructorSidebar />

      <div className="ml-64 w-full">
        <InstructorTopbar />

        <div className="p-8">
          <h1 className="text-3xl font-semibold">Upload Video</h1>

          <div className="bg-white shadow rounded-lg p-6 mt-6 space-y-4">
            <input type="file" className="block w-full" accept="video/*" />
            <input type="file" className="block w-full" accept="image/*" />

            <input className="w-full p-3 border rounded" placeholder="Video Title" />
            <textarea className="w-full p-3 border rounded" placeholder="Description"></textarea>

            <button className="px-6 py-3 bg-blue-600 text-white rounded">
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
