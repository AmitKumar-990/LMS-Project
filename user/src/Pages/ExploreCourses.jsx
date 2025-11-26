import { useState } from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import CourseCard from "../component/CourseCard";
import CourseFilters from "../component/CourseFilters";
import Pagination from "../component/Pagination";


export default function ExploreCourses() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // SAMPLE 20 COURSES
  const courses = [
    { id: 1, title: "Full Stack Web Development", instructor: "John", price: 799, img: "/src/assets/3.png", category: "Development" },
    { id: 2, title: "UI/UX Essentials", instructor: "Emily", price: 699, img: "/src/assets/5.jpg", category: "Design" },
    { id: 3, title: "Digital Marketing", instructor: "Michael", price: 499, img: "/src/assets/9.png", category: "Marketing" },
    { id: 4, title: "Full Stack Web Development", instructor: "John", price: 799, img: "/src/assets/3.png", category: "Development" },
    { id: 5, title: "UI/UX Essentials", instructor: "Emily", price: 699, img: "/src/assets/5.jpg", category: "Design" },
    { id: 6, title: "Digital Marketing", instructor: "Michael", price: 499, img: "/src/assets/9.png", category: "Marketing" },
    { id: 7, title: "Full Stack Web Development", instructor: "John", price: 799, img: "/src/assets/3.png", category: "Development" },
    { id: 8, title: "UI/UX Essentials", instructor: "Emily", price: 699, img: "/src/assets/5.jpg", category: "Design" },
    { id: 9, title: "Digital Marketing", instructor: "Michael", price: 499, img: "/src/assets/9.png", category: "Marketing" },
    { id: 10, title: "Full Stack Web Development", instructor: "John", price: 799, img: "/src/assets/3.png", category: "Development" },
    { id: 11, title: "UI/UX Essentials", instructor: "Emily", price: 699, img: "/src/assets/5.jpg", category: "Design" },
    { id: 12, title: "Digital Marketing", instructor: "Michael", price: 499, img: "/src/assets/9.png", category: "Marketing" },
    { id: 13, title: "Full Stack Web Development", instructor: "John", price: 799, img: "/src/assets/3.png", category: "Development" },
    { id: 14, title: "UI/UX Essentials", instructor: "Emily", price: 699, img: "/src/assets/5.jpg", category: "Design" },
    { id: 15, title: "Digital Marketing", instructor: "Michael", price: 499, img: "/src/assets/9.png", category: "Marketing" },
    { id: 18, title: "Full Stack Web Development", instructor: "John", price: 799, img: "/src/assets/3.png", category: "Development" },
    { id: 19, title: "UI/UX Essentials", instructor: "Emily", price: 699, img: "/src/assets/5.jpg", category: "Design" },
    { id: 20, title: "Digital Marketing", instructor: "Michael", price: 499, img: "/src/assets/9.png", category: "Marketing" },
  
  
  ];

  const filtered =
    activeCategory === "All"
      ? courses
      : courses.filter((c) => c.category === activeCategory);

  const itemsPerPage = 9;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const indexStart = (currentPage - 1) * itemsPerPage;
  const paginatedCourses = filtered.slice(indexStart, indexStart + itemsPerPage);

  return (
    <>
      <Navbar />

      <section className="pt-28 px-10 pb-16 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800">Explore Courses</h1>

        {/* Search */}
        <div className="mt-6 flex gap-3">
          <input
            type="text"
            placeholder="Search for courses..."
            className="w-full max-w-md px-4 py-2 border rounded-lg"
          />
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg">
            Search
          </button>
        </div>

        {/* Filters */}
        <CourseFilters active={activeCategory} setActive={setActiveCategory} />

        <div className="grid md:grid-cols-3 gap-10 mt-10">
          {paginatedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </section>

      <Footer />
    </>
  );
}