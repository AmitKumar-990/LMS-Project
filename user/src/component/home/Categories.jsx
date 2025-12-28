const categories = [
  "Web Development",
  "Data Science",
  "UI / UX Design",
  "Mobile Development",
  "Backend & APIs",
  "AI & Machine Learning",
  "Cloud & DevOps",
  "Cyber Security",
];

export default function Categories() {
  return (
    <section className="py-20 px-10 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
        {/* Browse by Category */}
        Courses Available
      </h2>

      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl text-center font-semibold text-gray-700 hover:text-blue-600 hover:shadow-md transition cursor-pointer"
          >
            {cat}
          </div>
        ))}
      </div>
    </section>
  );
}
