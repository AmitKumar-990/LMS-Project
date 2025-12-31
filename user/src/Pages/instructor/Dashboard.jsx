import InstructorSidebar from "../../component/InstructorSidebar";
import InstructorTopbar from "../../component/InstructorTopbar";
import StudentsLast7DaysChart from "../../component/charts/StudentLast7DaysChart";
import EarningsLast7DaysChart from "../../component/charts/EarningLast7DaysChart";
import { BookOpen, Users, IndianRupee, TrendingUp } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <InstructorSidebar />

      <div className="ml-64 w-full">
        <InstructorTopbar />

        <div className="p-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Instructor Dashboard
            </h1>
            <p className="text-gray-500 mt-1">
              Track your courses, students, and earnings at a glance
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Courses */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg hover:scale-[1.02] transition">
              <div className="flex items-center justify-between">
                <BookOpen size={36} />
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                  Active
                </span>
              </div>
              <p className="mt-6 text-blue-100">Total Courses</p>
              <h2 className="text-4xl font-bold mt-1">12</h2>
            </div>

            {/* Students */}
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-6 rounded-xl shadow-lg hover:scale-[1.02] transition">
              <div className="flex items-center justify-between">
                <Users size={36} />
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                  +12%
                </span>
              </div>
              <p className="mt-6 text-emerald-100">
                Total Students Enrolled
              </p>
              <h2 className="text-4xl font-bold mt-1">320</h2>
            </div>

            {/* Earnings */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg hover:scale-[1.02] transition">
              <div className="flex items-center justify-between">
                <IndianRupee size={36} />
                <TrendingUp size={22} />
              </div>
              <p className="mt-6 text-purple-100">Total Earnings</p>
              <h2 className="text-4xl font-bold mt-1">₹58,200</h2>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
            {/* Students Chart */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                Student Enrollments
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                New students joined in the last 7 days
              </p>
              <StudentsLast7DaysChart />
            </div>

            {/* Earnings Chart */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                Earnings Overview
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Revenue generated in the last 7 days
              </p>
              <EarningsLast7DaysChart />
            </div>
          </div>

          {/* Motivation Card */}
          <div className="mt-10 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-800">
              🚀 Keep Growing!
            </h3>
            <p className="text-gray-600 mt-1">
              Publish more courses and engage with students to boost your
              earnings and reach more learners.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
