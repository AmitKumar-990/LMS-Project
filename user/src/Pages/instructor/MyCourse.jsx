import { useEffect, useState } from "react";
import axios from "axios";

import InstructorSidebar from "../../component/InstructorSidebar";
import InstructorTopbar from "../../component/InstructorTopbar";
import CourseCardInstructor from "../../component/CourseCardInstruction";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const instructorId = localStorage.getItem("userId");

        const res = await axios.get(
          `http://localhost:5000/api/course/instructor/${instructorId}`
        );

        setCourses(res.data.courses); 
      } catch (err) {
        console.error("Failed to load courses", err);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="flex">
      <InstructorSidebar />

      <div className="ml-64 w-full">
        <InstructorTopbar />

        <div className="p-8">
          <h1 className="text-3xl font-semibold">My Courses</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {courses.length === 0 ? (
              <p className="text-gray-500">No courses added yet.</p>
            ) : (
              courses.map((course) => (
                <CourseCardInstructor key={course._id} course={course} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
