import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

import InstructorSidebar from "../../component/InstructorSidebar";
import InstructorTopbar from "../../component/InstructorTopbar";

import OverviewTab from "../../component/editor/OverviewTab";
import ChaptersTab from "../../component/editor/ChapterTab";
import SettingsTab from "../../component/editor/SettingsTab";

import { getCourseById as apiGetCourse } from "../../api/courseAPI";
import { LayoutDashboard, ListVideo, Settings } from "lucide-react";

const tabs = [
  { key: "Overview", icon: <LayoutDashboard size={18} /> },
  { key: "Chapters", icon: <ListVideo size={18} /> },
  { key: "Settings", icon: <Settings size={18} /> },
];

export default function CourseEditor() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Overview");
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCourse = useCallback(async () => {
    try {
      const { data } = await apiGetCourse(id);
      setCourse(data);
    } catch (err) {
      Swal.fire(err.response?.data?.message || "Failed to load course");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white px-6 py-4 rounded-xl shadow text-gray-700">
          Loading course editor...
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Course not found</p>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className="hidden md:block">
        <InstructorSidebar />
      </div>

      <div className="md:ml-64 w-full">
        <InstructorTopbar />

        <div className="p-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {course.title}
                </h1>
                <p className="text-gray-500 mt-1">
                  Manage your course content and settings
                </p>

                <div className="flex flex-wrap gap-3 mt-3 text-sm">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                    ₹ {course.price}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
                    {course.category || "Uncategorized"}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                    Status: Draft
                  </span>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex bg-gray-100 p-1 rounded-lg overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition font-medium ${
                      activeTab === tab.key
                        ? "bg-blue-600 text-white shadow"
                        : "text-gray-700 hover:bg-white"
                    }`}
                  >
                    {tab.icon}
                    {tab.key}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl shadow p-6">
            {activeTab === "Overview" && (
              <OverviewTab course={course} refresh={fetchCourse} />
            )}

            {activeTab === "Chapters" && (
              <ChaptersTab course={course} refresh={fetchCourse} />
            )}

            {activeTab === "Settings" && (
              <SettingsTab course={course} refresh={fetchCourse} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
