import { useEffect, useMemo, useState } from "react";
import { getAllCourses } from "../api/courseAPI";
import CourseCardStudent from "../component/CourseCardStudent";
import Navbar from "../component/Navbar"; 

export default function ExploreCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [page, setPage] = useState(1);
  const perPage = 9;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllCourses();
        const normalized = data.map((c) => ({
          ...c,
          price: typeof c.price === "number" ? c.price : Number(c.price || 0),
          difficulty: c.difficulty || "Beginner",
        }));
        setCourses(normalized);

        const prices = normalized.map((c) => c.price || 0);
        const min = Math.min(...prices, 0);
        const max = Math.max(...prices, 1000);
        setPriceRange([min, max]);
      } catch (err) {
        console.error("Failed to load courses", err);
      } finally {
        setLoading(false);
        setTimeout(() => setMounted(true), 50);
      }
    })();
  }, []);

  const categories = useMemo(() => {
    const set = new Set(courses.map((c) => c.category || "Uncategorized"));
    return ["All", ...Array.from(set)];
  }, [courses]);

  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

  const filtered = useMemo(() => {
    const [minPrice, maxPrice] = priceRange;
    return courses.filter((c) => {
      if (category !== "All" && (c.category || "Uncategorized") !== category)
        return false;
      if (difficulty !== "All" && (c.difficulty || "Beginner") !== difficulty)
        return false;
      if (c.price < minPrice || c.price > maxPrice) return false;
      if (query) {
        const q = query.toLowerCase();
        if (
          !(`${c.title} ${c.description || ""} ${
            c.instructor?.name || ""
          }`.toLowerCase().includes(q))
        )
          return false;
      }
      return true;
    });
  }, [courses, category, difficulty, priceRange, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  useEffect(() => {
    if (page > totalPages) {
      setPage(1);
    }
  }, [page, totalPages]);

  const paginated = filtered.slice(
    (page - 1) * perPage,
    (page - 1) * perPage + perPage
  );

  if (loading) return <div className="p-10">Loading courses...</div>;

  return (
    <>
      <Navbar /> 
      <div className="min-h-screen bg-gray-50 p-6 md:p-10 mt-20">
        <div className="max-w-[1200px] mx-auto">

          <div className="bg-white rounded-xl p-4 shadow flex flex-col md:flex-row gap-3 items-center">
            <div className="flex-1">
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search for courses, topics or instructors..."
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              />
            </div>

            <div className="flex gap-2 items-center overflow-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setCategory(cat);
                    setPage(1);
                  }}
                  className={`px-3 py-2 rounded-full text-sm ${
                    category === cat
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div>
              <select
                value={difficulty}
                onChange={(e) => {
                  setDifficulty(e.target.value);
                  setPage(1);
                }}
                className="px-3 py-2 border rounded-lg"
              >
                {difficulties.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([Number(e.target.value || 0), priceRange[1]])
                }
                className="w-24 px-2 py-2 border rounded"
                min={0}
              />
              <span className="text-gray-500">to</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value || 0)])
                }
                className="w-24 px-2 py-2 border rounded"
                min={0}
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-gray-700">{filtered.length} courses found</p>
            <div className="text-sm text-gray-500">
              Showing {paginated.length} of {filtered.length}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {paginated.map((course, idx) => (
              <div
                key={course._id}
                className={`transform transition duration-400 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <CourseCardStudent course={course} />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded bg-white border disabled:opacity-50"
            >
              Previous
            </button>

            <div className="px-4 py-2 bg-white border rounded">
              Page {page} of {totalPages}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded bg-white border disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
