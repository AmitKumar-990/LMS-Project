const reviews = [
  {
    name: "Aman Sharma",
    role: "Frontend Developer",
    review:
      "Get-Skillz helped me switch my career. The courses are practical and easy to follow.",
  },
  {
    name: "Neha Verma",
    role: "Computer Science Student",
    review:
      "The instructors explain concepts clearly. I love the structured learning paths.",
  },
  {
    name: "Rahul Mehta",
    role: "Backend Engineer",
    review:
      "One of the best platforms to learn real-world skills with projects.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-10 bg-white">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
        What Our Learners Say
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {reviews.map((r, i) => (
          <div
            key={i}
            className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <p className="text-gray-600 mb-4">“{r.review}”</p>
            <h4 className="font-semibold text-gray-900">{r.name}</h4>
            <p className="text-sm text-gray-500">{r.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
