import { useState } from "react";
import ThumbnailUploader from "../ThumbnailUploader";
import { uploadVideoFile } from "../../api/uploadAPI";
import { updateCourse } from "../../api/courseAPI";

export default function MediaTab({ course, refresh }) {
  const [promoFile, setPromoFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState(course.thumbnailUrl || "");

  const handlePromUpload = async () => {
    if (!promoFile) return alert("Choose a promo video");
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", promoFile);
      const res = await uploadVideoFile(form);
      // res.data.url is cloudinary url
      // we can save promo url inside course model (optionally add field promoUrl)
      await updateCourse(course._id, { promoUrl: res.data.url });
      alert("Promo uploaded and linked to course");
      await refresh();
    } catch (err) {
      console.error(err);
      ("Upload failed");
    }
    setUploading(false);
  };

  const handleThumbnail = async (url) => {
    setThumbnailUrl(url);
    try {
      await updateCourse(course._id, { thumbnailUrl: url });
      await refresh();
    } catch {
      alert("Failed to update thumbnail on server");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <div>
        <h3 className="font-semibold">Course Thumbnail</h3>
        <ThumbnailUploader onUpload={handleThumbnail} />
        {thumbnailUrl && (
          <img
            src={thumbnailUrl}
            alt="thumb"
            className="w-48 h-32 object-cover mt-3 rounded"
          />
        )}
      </div>

      <div className="mt-6">
        <h3 className="font-semibold">Promo Video</h3>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setPromoFile(e.target.files[0])}
          className="mt-2"
        />
        <div className="mt-3">
          <button
            onClick={handlePromUpload}
            disabled={uploading}
            className={`px-4 py-2 rounded text-white ${
              uploading ? "bg-gray-400" : "bg-blue-600"
            }`}
          >
            {uploading ? "Uploading..." : "Upload Promo Video"}
          </button>
        </div>
      </div>
    </div>
  );
}
