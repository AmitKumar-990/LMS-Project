import { Link } from "react-router-dom";

export default function BecomeInstructor() {
  return (
    <section className="py-20 px-10 bg-blue-600 text-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-12">
        
        <div>
          <h2 className="text-4xl font-bold mb-4">
            Become an Instructor
          </h2>
          <p className="text-blue-100 text-lg mb-6">
            Share your knowledge, build your brand, and earn by teaching millions of learners.
          </p>

          <Link
            to="/register"
            className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            Start Teaching Today
          </Link>
        </div>

        <div className="text-center">
          <ul className="space-y-4 text-lg">
            <li>✔ Earn passive income</li>
            <li>✔ Reach global students</li>
            <li>✔ Full control over your content</li>
            <li>✔ Dedicated instructor dashboard</li>
          </ul>
        </div>

      </div>
    </section>
  );
}
