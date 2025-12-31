import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import CourseCardStudent from "../CourseCardStudent";
import { getAllCourses } from "../../api/courseAPI";

export default function CourseSlider() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllCourses();
        setCourses(data);
      } catch (err) {
        console.error("Failed to load courses", err);
      }
    })();
  }, []);

  if (courses.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Popular Courses
          </h2>
        </div>

        {/* Slider */}
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          grabCursor={true}
          speed={500} // smooth transition speed
          autoplay={{
            delay: 2000, // slide speed
            disableOnInteraction: false,
            pauseOnMouseEnter: true, // feels premium
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="course-swiper"
        >
          {courses.map((course) => (
            <SwiperSlide
              key={course._id}
              className="transition-transform duration-300 hover:scale-[1.03]"
            >
              <CourseCardStudent course={course} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
