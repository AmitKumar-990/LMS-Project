import PageWrapper from "./PageWrapper";
import Navbar from "../../component/home/Navbar";
import Footer from "../../component/home/Footer";

export default function About() {
  return (
    <>
    <Navbar />
    <div className="bg-white">

      {/* HERO */}
      <section className="py-24 px-6 md:px-12 bg-gray-50 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          About <span className="text-blue-600">Get-Skillz</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
          Get-Skillz is an online learning platform built to help students
          and professionals gain real-world, industry-ready skills.
        </p>
      </section>

      {/* MISSION + VISION */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="p-8 rounded-xl border hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-4">🎯 Our Mission</h3>
            <p className="text-gray-600">
              To make high-quality, practical education accessible to everyone,
              regardless of background or location.
            </p>
          </div>

          <div className="p-8 rounded-xl border hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-4">🚀 Our Vision</h3>
            <p className="text-gray-600">
              To become a trusted global learning platform that bridges the gap
              between education and industry.
            </p>
          </div>
        </div>
      </section>

      {/* WHY GET-SKILLZ */}
      <section className="py-20 px-6 md:px-12 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Get-Skillz?
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            "Industry-focused courses",
            "Expert instructors",
            "Flexible self-paced learning",
            "Affordable pricing",
            "Real-world projects",
            "Career-oriented approach",
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition text-center"
            >
              <p className="font-medium text-gray-800">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { number: "10K+", label: "Learners" },
            { number: "200+", label: "Courses" },
            { number: "50+", label: "Instructors" },
            { number: "100%", label: "Skill-Focused" },
          ].map((s, i) => (
            <div key={i}>
              <h3 className="text-4xl font-bold text-blue-600">{s.number}</h3>
              <p className="text-gray-600 mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* JOURNEY */}
      <section className="py-20 px-6 md:px-12 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our Journey
        </h2>

        <div className="max-w-4xl mx-auto space-y-6">
          {[
            "2024 – Get-Skillz idea was born",
            "Built LMS with real-world features",
            "Launched instructor & student dashboards",
            "Added payments, certificates, analytics",
          ].map((step, i) => (
            <div
              key={i}
              className="p-6 border-l-4 border-blue-600 bg-white rounded shadow-sm"
            >
              <p className="text-gray-700">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-12 bg-blue-600 text-center text-white">
        <h2 className="text-4xl font-bold mb-4">
          Ready to start learning?
        </h2>
        <p className="text-blue-100 mb-8">
          Join Get-Skillz and build skills that actually matter.
        </p>

        <a
          href="/register"
          className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition"
        >
          Get Started for Free
        </a>
      </section>

    </div>
    </>
  );
}

