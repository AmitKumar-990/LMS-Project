import { useState } from "react";
import Navbar from "../../component/home/Navbar";

const reviewsData = [
  {
    name: "Amit Kumar",
    role: "Frontend Developer",
    rating: 5,
    review:
      "Get-Skillz helped me understand React from scratch. The courses are very practical and beginner-friendly.",
  },
  {
    name: "Neha Sharma",
    role: "BCA Student",
    rating: 4,
    review:
      "The instructors explain concepts clearly. I especially liked the project-based approach.",
  },
  {
    name: "Rahul Verma",
    role: "Backend Developer",
    rating: 5,
    review:
      "One of the best platforms for learning backend development. The LMS UI is very smooth.",
  },
  {
    name: "Sneha Patel",
    role: "Career Switcher",
    rating: 4,
    review:
      "Great platform for people switching careers. The learning pace is flexible and easy to follow.",
  },
];

export default function Reviews() {
  const [filter, setFilter] = useState("All");

  const filteredReviews =
    filter === "All"
      ? reviewsData
      : reviewsData.filter((r) => r.rating === Number(filter));

  return (
    <>
    <Navbar />
    <div className="bg-white">

      {/* HERO */}
      <section className="py-24 px-6 md:px-12 bg-gray-50 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          What Our Learners Say
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Real experiences from students who transformed their careers with Get-Skillz.
        </p>
      </section>

      {/* STATS */}
      <section className="py-14 px-6 md:px-12">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 border rounded-xl">
            <h2 className="text-4xl font-bold text-blue-600">4.8</h2>
            <p className="text-gray-600 mt-2">Average Rating</p>
          </div>
          <div className="p-6 border rounded-xl">
            <h2 className="text-4xl font-bold text-blue-600">10k+</h2>
            <p className="text-gray-600 mt-2">Happy Learners</p>
          </div>
          <div className="p-6 border rounded-xl">
            <h2 className="text-4xl font-bold text-blue-600">500+</h2>
            <p className="text-gray-600 mt-2">Verified Reviews</p>
          </div>
        </div>
      </section>

      {/* FILTER */}
      <section className="py-6 px-6 md:px-12 text-center">
        <div className="flex justify-center gap-3 flex-wrap">
          {["All", "5", "4", "3"].map((r) => (
            <button
              key={r}
              onClick={() => setFilter(r)}
              className={`px-5 py-2 rounded-full border transition ${
                filter === r
                  ? "bg-blue-600 text-white border-blue-600"
                  : "hover:border-blue-600"
              }`}
            >
              {r === "All" ? "All Reviews" : `${r} ⭐`}
            </button>
          ))}
        </div>
      </section>

      {/* REVIEWS GRID */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {filteredReviews.map((r, i) => (
            <div
              key={i}
              className="p-6 border rounded-xl hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">{r.name}</h3>
                <span className="text-yellow-500">
                  {"⭐".repeat(r.rating)}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-3">{r.role}</p>
              <p className="text-gray-600">{r.review}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-12 bg-blue-600 text-center text-white">
        <h2 className="text-4xl font-bold mb-4">
          Share Your Experience
        </h2>
        <p className="text-blue-100 mb-8">
          Your feedback helps us improve and inspires new learners.
        </p>

        <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition">
          Write a Review
        </button>
      </section>

    </div>
    </>
  );
}
