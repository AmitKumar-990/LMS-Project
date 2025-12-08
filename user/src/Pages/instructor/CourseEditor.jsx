import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

import InstructorSidebar from "../../component/InstructorSidebar";
import InstructorTopbar from "../../component/InstructorTopbar";

import OverviewTab from "../../component/editor/OverviewTab";
import ChaptersTab from "../../component/editor/ChapterTab";
import SettingsTab from "../../component/editor/SettingsTab";

import { getCourseById as apiGetCourse } from "../../api/courseAPI";

const tabs = ["Overview", "Chapters", "Settings"];

export default function CourseEditor() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Overview");
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCourse = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await apiGetCourse(id);
      setCourse(data);
    } catch (err) {
      Swal.fire(err.response?.data?.message || "Failed to load course");
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    const loadCourse = async () => {
      setLoading(true);
      try {
        const { data } = await apiGetCourse(id);
        setCourse(data);
      } catch (err) {
        Swal.fire(err.response?.data?.message || "Failed to load course");
      }
      setLoading(false);
    };

    loadCourse();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading...
      </div>
    );

  if (!course)
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Course not found
      </div>
    );

  return (
    <div className="flex bg-gray-100 min-h-screen">

      {/* Sidebar (hidden on small screens) */}
      <div className="hidden md:block">
        <InstructorSidebar />
      </div>

      <div className="md:ml-64 w-full">
        <InstructorTopbar />

        {/* Page Container */}
        <div className="p-4 sm:p-6 md:p-8">

          {/* Course Header Card */}
          <div className="bg-white shadow rounded-xl p-4 sm:p-6 mb-6
                          flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
                {course.title}
              </h1>
              <p className="text-gray-500 mt-1 text-sm sm:text-base">
                Manage course information, chapters, and settings
              </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 bg-gray-100 p-1 rounded-lg overflow-x-auto">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`px-3 sm:px-4 py-2 rounded-lg transition whitespace-nowrap ${
                    activeTab === t
                      ? "bg-blue-600 text-white shadow"
                      : "text-gray-700 hover:bg-white"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Content Box */}
          <div className="bg-white shadow-md rounded-xl p-4 sm:p-6">
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
