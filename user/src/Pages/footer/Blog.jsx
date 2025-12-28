import { useState } from "react";
import Navbar from "../../component/home/Navbar";

const categories = [
  "All",
  "Web Development",
  "Frontend",
  "Backend",
  "AI & ML",
  "Career",
  "Tips",
];

const blogs = [
  {
    id: 1,
    title: "How to Become a Full Stack Developer in 2025",
    excerpt:
      "A complete roadmap covering frontend, backend, projects, and career tips.",
    category: "Web Development",
    readTime: "6 min read",
    featured: true,
  },
  {
    id: 2,
    title: "React Best Practices Every Beginner Should Know",
    excerpt:
      "Learn how to write clean, scalable, and maintainable React code.",
    category: "Frontend",
    readTime: "5 min read",
  },
  {
    id: 3,
    title: "Node.js vs Django: Which Backend Should You Choose?",
    excerpt:
      "A practical comparison to help you decide the right backend tech.",
    category: "Backend",
    readTime: "7 min read",
  },
  {
    id: 4,
    title: "Top Skills Employers Look for in Developers",
    excerpt:
      "Soft skills + technical skills that can boost your hiring chances.",
    category: "Career",
    readTime: "4 min read",
  },
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      activeCategory === "All" || blog.category === activeCategory;

    const matchesSearch =
      blog.title.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const featuredBlog = blogs.find((b) => b.featured);

  return (
    <>
    <Navbar />
    <div className="bg-white">

      {/* HERO */}
      <section className="py-24 px-6 md:px-12 bg-gray-50 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Get-Skillz Blog
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Insights, tutorials, and career guidance to help you grow faster.
        </p>

        {/* SEARCH */}
        <div className="mt-8 max-w-xl mx-auto flex shadow rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-5 py-4 outline-none"
          />
          <button className="px-6 bg-blue-600 text-white font-semibold">
            Search
          </button>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-10 px-6 md:px-12">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full border transition ${
                activeCategory === cat
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 hover:border-blue-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED BLOG */}
      {featuredBlog && (
        <section className="py-14 px-6 md:px-12 bg-gray-50">
          <div className="max-w-5xl mx-auto p-8 bg-white rounded-xl shadow hover:shadow-lg transition">
            <span className="text-sm text-blue-600 font-semibold">
              ⭐ Featured Article
            </span>
            <h2 className="text-3xl font-bold mt-3 mb-4">
              {featuredBlog.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {featuredBlog.excerpt}
            </p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{featuredBlog.category}</span>
              <span>{featuredBlog.readTime}</span>
            </div>
          </div>
        </section>
      )}

      {/* BLOG GRID */}
      <section className="py-20 px-6 md:px-12">
        <h2 className="text-3xl font-bold text-center mb-12">
          Latest Articles
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="p-6 border rounded-xl hover:shadow-lg transition cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-3">
                {blog.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {blog.excerpt}
              </p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{blog.category}</span>
                <span>{blog.readTime}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section className="py-24 px-6 md:px-12 bg-blue-600 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Stay Updated
        </h2>
        <p className="text-blue-100 mb-6">
          Get the latest articles and learning resources delivered to your inbox.
        </p>

        <div className="max-w-md mx-auto flex overflow-hidden rounded-lg">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-5 py-3 outline-none text-gray-800"
          />
          <button className="px-6 bg-white text-blue-600 font-semibold">
            Subscribe
          </button>
        </div>
      </section>

    </div>
    </>
  );
}
