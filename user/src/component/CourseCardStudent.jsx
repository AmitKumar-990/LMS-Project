import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userIsEnrolled } from "../api/enrollmentAPI";
// import { toggleWishlist } from "../api/wishlistAPI";
import ReviewStars from "./reviewStars";

export default function CourseCardStudent({ course }) {
  const navigate = useNavigate();
  const [enrolled, setEnrolled] = useState(false);
  // const [saved, setSaved] = useState(false);
  // const [busy, setBusy] = useState(false);

useEffect(() => {
  (async () => {
    try {
      const res = await userIsEnrolled(course._id);
      setEnrolled(res.data?.enrolled || false);
    } catch {
      // ignore
    }
    // No single-wishlist check endpoint yet
    // setSaved(course.saved || false);
  })();
}, [course]);

  // const handleWishlist = async (e) => {
  //   e.stopPropagation();
  //   setBusy(true);
  //   try {
  //     const res = await toggleWishlist(course._id);
  //     setSaved(res.data.saved);
  //   } catch (err) {
  //     console.error(err);
  //     alert("Could not update wishlist");
  //   }
  //   setBusy(false);
  // };

  return (
    <div
      onClick={() => navigate(`/course/${course._id}`)}
      className="border rounded-xl shadow p-4 bg-white hover:shadow-lg hover:scale-[1.02] transition cursor-pointer relative"
    >
      {/* wishlist */}
      {/* <button
        onClick={handleWishlist}
        disabled={busy}
        className="absolute top-3 right-3 text-xl"
        title={saved ? "Remove from wishlist" : "Add to wishlist"}
      >
        {saved ? "❤️" : "🤍"}
      </button> */}

      <div className="overflow-hidden rounded-lg">
        <img src={course.thumbnailUrl} alt={course.title} className="w-full h-40 object-cover rounded-lg" />
      </div>

      <h3 className="text-lg font-semibold mt-3">{course.title}</h3>
      <p className="text-sm text-gray-500 mt-1">By {course.instructor?.name || "Instructor"}</p>

      <div className="mt-2 flex items-center justify-between">
        <ReviewStars rating={course.avgRating || 4.5} />
        <div className="text-xl font-bold">₹{course.price}</div>
      </div>

      <div className="mt-4 flex gap-2">
        {enrolled ? (
          <button onClick={(e) => { e.stopPropagation(); navigate(`/course/${course._id}/content`) }} className="px-4 py-2 bg-green-600 text-white rounded">
            Go to Course
          </button>
        ) : (
          <button onClick={(e) => { e.stopPropagation(); navigate(`/buy/${course._id}`) }} className="px-4 py-2 bg-blue-600 text-white rounded">
            Buy Now
          </button>
        )}

        {/* <button onClick={(e)=>{ e.stopPropagation(); navigate(`/course/${course._id}`) }} className="px-4 py-2 bg-gray-800 text-white rounded">
          View
        </button> */}
      </div>
    </div>
  );
}
