import InstructorSidebar from "../../component/InstructorSidebar";
import InstructorTopbar from "../../component/InstructorTopbar";

export default function Dashboard() {
  return (
    <div className="flex">
      <InstructorSidebar />

      <div className="ml-64 w-full">
        <InstructorTopbar />

        <div className="p-8">
          <h1 className="text-3xl font-semibold text-gray-800">Overview</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="p-6 bg-white shadow rounded-lg">
              <p className="text-gray-500">Total Courses</p>
              <h2 className="text-3xl font-bold mt-2">12</h2>
            </div>

            <div className="p-6 bg-white shadow rounded-lg">
              <p className="text-gray-500">Total Students</p>
              <h2 className="text-3xl font-bold mt-2">320</h2>
            </div>

            <div className="p-6 bg-white shadow rounded-lg">
              <p className="text-gray-500">Total Earnings</p>
              <h2 className="text-3xl font-bold mt-2">₹58,200</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
