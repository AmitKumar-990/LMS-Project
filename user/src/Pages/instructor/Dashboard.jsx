import InstructorSidebar from "../../component/InstructorSidebar";
import InstructorTopbar from "../../component/InstructorTopbar";

import StudentsLast7DaysChart from "../../component/charts/StudentLast7DaysChart";
import EarningsLast7DaysChart from "../../component/charts/EarningLast7DaysChart";
import CourseComparisonChart from "../../component/charts/CourseComparisonChart";

export default function Dashboard() {
  return (
    <div className="flex">
      <InstructorSidebar />

      <div className="ml-64 w-full">
        <InstructorTopbar />

        <div className="p-8">
          <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="p-6 bg-white shadow rounded-lg">
              <p className="text-gray-500">Total Courses</p>
              <h2 className="text-3xl font-bold mt-2">12</h2>
            </div>

            <div className="p-6 bg-white shadow rounded-lg">
              <p className="text-gray-500">Total Students Enrolled</p>
              <h2 className="text-3xl font-bold mt-2">320</h2>
            </div>

            <div className="p-6 bg-white shadow rounded-lg">
              <p className="text-gray-500">Total Earnings</p>
              <h2 className="text-3xl font-bold mt-2">₹58,200</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
            <div className="bg-white p-6 shadow rounded-lg">
              <h2 className="text-lg font-semibold mb-4">
                Students Enrolled (Last 7 Days)
              </h2>
              <StudentsLast7DaysChart />
            </div>

            <div className="bg-white p-6 shadow rounded-lg">
              <h2 className="text-lg font-semibold mb-4">
                Earnings (Last 7 Days)
              </h2>
              <EarningsLast7DaysChart />
            </div>
          </div>

          <div className="bg-white p-6 shadow rounded-lg mt-10">
            <h2 className="text-lg font-semibold mb-4">
              Course Performance Comparison
            </h2>
            <CourseComparisonChart />
          </div>
        </div>
      </div>
    </div>
  );
}
