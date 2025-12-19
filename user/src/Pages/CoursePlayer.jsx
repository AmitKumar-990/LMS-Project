import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Navbar from "../component/Navbar";
import { getCourseById } from "../api/courseAPI";
import { updateUserProgress, getUserProgress } from "../api/progressAPI";

export default function CoursePlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { search } = useLocation();

  const chapterIndex = Number(new URLSearchParams(search).get("chapter")) || 0;

  const [course, setCourse] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [progress, setProgress] = useState(0);

  const videoRef = useRef(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const changeSpeed = (speed) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const res = await getCourseById(id);
        const courseData = res.data;

        setCourse(courseData);
        setCurrentChapter(courseData.chapters?.[chapterIndex] || null);

        let p = 0;
        try {
          const prog = await getUserProgress(id);
          p = prog?.data?.progress || 0;
        } catch {
          p = 0;
        }
        setProgress(p);
      } catch (err) {
        console.error("Course load failed:", err);
        setCourse(null);
      }
    })();
  }, [id, chapterIndex]);

  if (!course) return <div className="p-10">Loading course...</div>;
  if (!currentChapter) {
    return (
      <div className="p-10 text-red-600 font-semibold">
        This chapter is missing or was deleted.
      </div>
    );
  }
  const chapters = course.chapters || [];

  const handleMarkCompleted = async () => {
    const completedCount = chapterIndex + 1;
    const total = chapters.length;

    const newProgress = Math.round((completedCount / total) * 100);
    setProgress(newProgress);

    try {
      await updateUserProgress(id, { progress: newProgress });
    } catch (err) {
      console.error("Unable to update progress", err);
    }
  };

  return (
    <>
      <Navbar />
      <br></br>
      <br></br>
      <br></br>
      {/* <br></br> */}

      <div className="pt-24 min-h-screen bg-gray-100 flex">
        <div className="flex-1 px-6 pb-10">
          <div
            className="relative w-full overflow-hidden rounded-xl shadow-lg"
            style={{ paddingTop: "50.25%" }}
          >
            {currentChapter.videoUrl ? (
              <video
                src={currentChapter.videoUrl}
                controls
                className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
                onEnded={handleMarkCompleted}
              />
            ) : (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 rounded-xl text-gray-700">
                No video uploaded for this chapter
              </div>
            )}
          </div>

          <div className="mt-4 flex gap-3 items-center">
            <span className="font-medium text-gray-700">Speed:</span>

            {[1, 1.25, 1.5, 2].map((speed) => (
              <button
                key={speed}
                onClick={() => changeSpeed(speed)}
                className={`px-4 py-1 rounded-lg border transition 
                  ${
                    playbackSpeed === speed
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
              >
                {speed}x
              </button>
            ))}
          </div>

          <div className="mt-8">
            <span className="text-sm font-medium text-gray-700">
              Course Progress ({progress}%)
            </span>

            <div className="w-full bg-gray-300 h-4 rounded-full mt-2">
              <div
                className="h-4 bg-green-500 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          {progress === 100 && (
            <div className="mt-8">
              <button
                onClick={() => navigate(`/course/${id}/start-test`)}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition text-lg font-semibold"
              >
                Start Final AI Assessment
              </button>

              <p className="text-sm text-gray-500 mt-2">
                Complete this AI-generated test to receive your certificate on
                the basis of your performance.
              </p>
            </div>
          )}
          

          <h1 className="text-3xl font-bold mt-6 text-gray-900">
            {currentChapter.title}
          </h1>

          <p className="mt-2 text-gray-600 leading-relaxed">
            {currentChapter.description}
          </p>

          {currentChapter.pdfUrl && (
            <div className="mt-5 bg-white p-4 rounded-lg shadow flex items-center justify-between border">
              <div>
                <h3 className="font-semibold text-gray-800">PDF Resource</h3>
                <p className="text-sm text-gray-500">Download study material</p>
              </div>

              <a
                href={currentChapter.pdfUrl}
                target="_blank"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Download
              </a>
            </div>
          )}

          <div className="flex justify-between mt-8">
            {chapterIndex > 0 ? (
              <button
                onClick={() =>
                  navigate(`/course/${id}/content?chapter=${chapterIndex - 1}`)
                }
                className="px-5 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                ← Previous
              </button>
            ) : (
              <div></div>
            )}

            {chapterIndex < chapters.length - 1 && (
              <button
                onClick={() =>
                  navigate(`/course/${id}/content?chapter=${chapterIndex + 1}`)
                }
                className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Next →
              </button>
            )}
          </div>
        </div>

        <div className="w-80 bg-white border-l shadow-inner p-5 overflow-y-auto sticky top-20 h-[calc(100vh-80px)]">
          <h2 className="text-xl font-semibold mb-4">Course Content</h2>

          <div className="space-y-2">
            {chapters.map((ch, i) => (
              <div
                key={ch._id}
                onClick={() => navigate(`/course/${id}/content?chapter=${i}`)}
                className={`p-4 rounded-lg cursor-pointer transition border 
                  ${
                    i === chapterIndex
                      ? "bg-blue-100 border-blue-600"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
              >
                <div className="font-semibold">{ch.title}</div>
                <div className="text-sm text-gray-600 line-clamp-2">
                  {ch.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
