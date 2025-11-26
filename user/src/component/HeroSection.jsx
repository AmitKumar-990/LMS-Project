export default function HeroSection() {
  return (
    <section className="pt-28 pb-20 px-10 grid md:grid-cols-2 items-center gap-10 bg-white">

      {/* LEFT TEXT */}
      <div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
          Unlock Your Potential with <span className="text-blue-600">Get-Skillz</span>
        </h1>

        <p className="text-gray-600 text-lg mt-4">
          Learn Any Skill, Anywhere, Anytime
        </p>

        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition">
          <a href="/ExploreCourses" className="hover:text-blue-600">Explore Courses</a>
        </button>
      </div>

      {/* RIGHT IMAGE */}
      <div className="flex justify-center">
        <img
          src="/src/assets/edu.png"
          alt="Hero"
          className="w-4/5"
        />
      </div>
    </section>
  );
}
