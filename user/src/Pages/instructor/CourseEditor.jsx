import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import Swal from "sweetalert2";

import InstructorSidebar from "../../component/InstructorSidebar";
import InstructorTopbar from "../../component/InstructorTopbar";
import OverviewTab from "../../component/editor/OverviewTab";
import ChaptersTab from "../../component/editor/ChapterTab";
import MediaTab from "../../component/editor/MediaTab";
import SettingsTab from "../../component/editor/SettingsTab";
import { getCourseById as apiGetCourse } from "../../api/courseAPI";

const tabs = ["Overview", "Chapters", "Media", "Settings"];

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
  const run = () => {
    fetchCourse();
  };
  run();
}, [fetchCourse]);

  if (loading)
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!course)
    return <div className="min-h-screen flex items-center justify-center">Course not found</div>;

  return (
    <div className="flex">
      <InstructorSidebar />
      <div className="ml-64 w-full">
        <InstructorTopbar />

        <div className="p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{course.title}</h1>

            <div className="flex gap-3">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`px-4 py-2 rounded ${
                    activeTab === t
                      ? "bg-blue-600 text-white"
                      : "bg-white border"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            {activeTab === "Overview" && <OverviewTab course={course} refresh={fetchCourse} />}
            {activeTab === "Chapters" && <ChaptersTab course={course} refresh={fetchCourse} />}
            {activeTab === "Media" && <MediaTab course={course} refresh={fetchCourse} />}
            {activeTab === "Settings" && <SettingsTab course={course} />}
          </div>
        </div>
      </div>
    </div>
  );
}
