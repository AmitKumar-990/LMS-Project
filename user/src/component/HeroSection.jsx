import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="min-h-screen pt-32 pb-24 px-6 md:px-12 bg-white flex items-center">
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div className="space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Unlock Your Potential with  
            <span className="text-blue-600"> Get-Skillz</span>
          </h1>

          <p className="text-gray-600 text-lg md:text-xl max-w-xl">
            Learn industry-ready skills from expert instructors.  
            Build real-world projects and grow your career — anytime, anywhere.
          </p>

          {/* SEARCH BAR */}
          {/* <div className="bg-white shadow-lg rounded-xl flex overflow-hidden max-w-xl border">
            <input
              type="text"
              placeholder="What do you want to learn?"
              className="flex-1 px-5 py-4 outline-none text-gray-700"
            />
            <button className="px-6 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
              Search
            </button>
          </div> */}

          {/* CTA BUTTONS */}
          <div className="flex flex-wrap gap-4">
            <Link
              to="/ExploreCourses"
              className="px-8 py-3 bg-blue-600 text-white text-lg rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition"
            >
              Explore Courses
            </Link>

            {/* <Link
              to="/register"
              className="px-8 py-3 border border-gray-300 text-gray-800 text-lg rounded-lg hover:border-blue-600 hover:text-blue-600 transition"
            >
              Join for Free
            </Link> */}
          </div>

          {/* MINI FEATURES */}
          <div className="grid grid-cols-2 gap-4 text-gray-600 text-sm pt-2">
            <p>✔ Expert-led courses</p>
            <p>✔ Flexible learning</p>
            <p>✔ Certificates on completion</p>
            <p>✔ Lifetime access</p>
          </div>

          {/* STATS */}
          <div className="flex gap-10 pt-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">10K+</h3>
              <p className="text-gray-500 text-sm">Learners</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">200+</h3>
              <p className="text-gray-500 text-sm">Courses</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">50+</h3>
              <p className="text-gray-500 text-sm">Instructors</p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center">
          <img
            src="/src/assets/16.png"
            alt="Online Learning"
            className="w-[90%] drop-shadow-2xl"
          />
        </div>

      </div>
    </section>
  );
}
