const categories = ["All", "Development", "Design", "Marketing", "Business"];

export default function CourseFilters({ active, setActive }) {
  return (
    <div className="flex flex-wrap gap-3 mt-6">
      {categories.map((cat, i) => (
        <button
          key={i}
          onClick={() => setActive(cat)}
          className={`px-4 py-2 rounded-full text-sm border transition
          ${active === cat ? "bg-blue-600 text-white" : "bg-white text-gray-600 border-gray-300 hover:bg-blue-50"}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
