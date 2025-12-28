import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById } from "../api/courseAPI";
import { userIsEnrolled } from "../api/enrollmentAPI";
import { toggleWishlist } from "../api/wishlistAPI";
import { getCourseReviews } from "../api/reviewAPI";
import ReviewStars from "../component/ReviewStars";
import Navbar from "../component/home/Navbar";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [wishSaved, setWishSaved] = useState(false);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [avgRating, setAvgRating] = useState(0);

  // const instructorJoinedDate = course.instructor?.createdAt
  // ? new Date(course.instructor?.createdAt)
  // : new Date(); 

  useEffect(() => {
    (async () => {
      setLoading(true);

      const [courseRes, enrollRes, reviewsRes] = await Promise.allSettled([
        getCourseById(id),
        userIsEnrolled(id),
        getCourseReviews(id),
      ]);
      
      // COURSE
      if (courseRes.status === "fulfilled") {
        setCourse(courseRes.value.data);
      } else {
        setCourse(null);
      }

      // ENROLLMENT
      if (enrollRes.status === "fulfilled") {
        setEnrolled(Boolean(enrollRes.value.data.enrolled));
      } else {
        setEnrolled(false);
      }

      //REVIEWS 
      if (reviewsRes.status === "fulfilled") {
        const arr = reviewsRes.value.data || [];
        setReviewsCount(arr.length);
        setAvgRating(
          arr.length
            ? (arr.reduce((a, b) => a + b.rating, 0) / arr.length).toFixed(1)
            : 0
        );
      } else {
        setReviewsCount(0);
        setAvgRating(0);
      }

      setLoading(false);
    })();
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!course) return <div className="p-8">Course not found</div>;
  // const instructorJoinedDate = course.instructor?.createdAt
  // ? new Date(course.instructor.createdAt)
  // : new Date();

  const handleBuy = () => navigate(`/buy/${course._id}`);
  const handleStart = () => navigate(`/course/${course._id}/content`);

  const handleWishlist = async () => {
    try {
      const res = await toggleWishlist(course._id);
      setWishSaved(Boolean(res.data.saved));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-50 pt-28 pb-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: main info */}
          <div className="lg:col-span-2">
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <img
                src={course.thumbnailUrl}
                alt={course.title}
                className="w-full md:w-56 h-36 object-cover rounded-lg shadow"
              />

              <div className="flex-1">
                <h1 className="text-2xl font-bold">{course.title}</h1>
                <p className="text-sm text-gray-600 mt-1">
                  By {course.instructor?.name || "Instructor"}
                </p>

                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-2">
                    <ReviewStars rating={avgRating || 4.5} />
                    <span className="text-sm text-gray-600">
                      ({reviewsCount})
                    </span>
                  </div>

                  <div className="text-sm text-gray-500">
                    Category: {course.category || "General"}
                  </div>
                </div>

                <p className="mt-4 text-gray-700 whitespace-pre-line">
                  {course.description}
                </p>
              </div>
            </div>

            {/* What you'll learn / bullet list (if provided) */}
            {course.outcomes && course.outcomes.length > 0 ? (
              <div className="mt-6">
                <h3 className="font-semibold text-lg mb-2">
                  What you'll learn
                </h3>
                <ul className="list-disc pl-5 text-gray-700">
                  {course.outcomes.map((o, i) => (
                    <li key={i}>{o}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* Chapters preview */}
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-3">Curriculum</h3>

              <div className="space-y-2">
                {/* chapters might be populated with chapter docs */}
                {Array.isArray(course.chapters) && course.chapters.length ? (
                  course.chapters.map((ch, idx) => {
                    const locked = !enrolled;
                    return (
                      <div
                        key={ch._id || idx}
                        className="flex items-center justify-between bg-gray-50 p-3 rounded"
                      >
                        <div>
                          <div className="font-medium">{ch.title}</div>
                          <div className="text-sm text-gray-500">
                            {ch.description?.slice(0, 100)}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {locked ? (
                            <span className="text-sm text-gray-500">
                              Locked
                            </span>
                          ) : (
                            <button
                              onClick={() =>
                                navigate(
                                  `/course/${course._id}/content?chapter=${idx}`
                                )
                              }
                              className="text-sm text-blue-600"
                            >
                              Open
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-gray-500">No curriculum added yet.</div>
                )}
              </div>
            </div>
          </div>

          {/* Right column: Purchase / meta */}
          <aside className="space-y-4">
            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="text-sm text-gray-600">Price</div>
              <div className="text-3xl font-bold text-blue-600 mt-1">
                ₹{course.price || 0}
              </div>

              <div className="mt-4 flex gap-2">
                {enrolled ? (
                  <button
                    onClick={handleStart}
                    className="w-full px-4 py-3 bg-green-600 text-white rounded-lg"
                  >
                    Start Course
                  </button>
                ) : (
                  <button
                    onClick={handleBuy}
                    className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg"
                  >
                    Buy Now
                  </button>
                )}
              </div>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={handleWishlist}
                  className={`flex-1 px-3 py-2 border rounded ${
                    wishSaved
                      ? "bg-red-50 border-red-400 text-red-600"
                      : "bg-white"
                  }`}
                >
                  {wishSaved ? "Saved" : "Add to wishlist"}
                </button>

                <button
                  onClick={() => navigate(`/course/${course._id}/reviews`)}
                  className="px-3 py-2 bg-white border rounded text-gray-700"
                >
                  Reviews
                </button>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-semibold">Instructor</h4>
              <div className="mt-3 flex items-center gap-3">
                <img
                  src="/src/assets/5360344.png"
                  alt="inst"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium">{course.instructor?.name}</div>
                  <div className="text-sm text-gray-600">
                    {/* Joined:  */}
                    {/* {instructorJoinedDate.toLocaleDateString()} */}
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-white text-sm text-gray-600">
              <div>
                <strong>Enrolled:</strong> {course.enrolledCount || 0}
              </div>
              <div className="mt-2">
                <strong>Last updated:</strong>{" "}
                {new Date(
                  course.updatedAt || course.createdAt
                ).toLocaleDateString()}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
    </>
  );
}
