import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="pt-28 pb-20 px-10 grid md:grid-cols-2 items-center gap-12 bg-white">

      <div className="space-y-5">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Unlock Your Potential with  
          <span className="text-blue-600"> Get-Skillz</span>
        </h1>

        <p className="text-gray-600 text-lg max-w-md">
          Learn industry-ready skills from expert instructors — at your own place, anytime, anywhere.
        </p>

        <Link
          to="/ExploreCourses"
          className="inline-block mt-4 px-7 py-3 bg-blue-600 text-white text-lg rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all"
        >
          Explore Courses
        </Link>
      </div>

      <div className="flex justify-center">
        <img
          src="/src/assets/16.png"
          alt="Hero"
          className="w-4/5"
        />
      </div>

      {/* <div className="flex justify-center">
        <img
          src="/src/assets/edu.png"
          alt="Learning Illustration"
          className="w-4/5 md:w-full drop-shadow-md animate-fadeInUp"
        />
      </div> */}

    </section>
  );
}
