import { useState } from "react";
import Swal from "sweetalert2";
import { uploadThumbnail } from "../api/uploadAPI";

export default function ThumbnailUploader({ onUpload }) {
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleThumbnail = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setProgress(10);

    const formData = new FormData();
    formData.append("file", file);

    try {
      let fakeProgress = 10;
      const interval = setInterval(() => {
        fakeProgress += 10;
        if (fakeProgress >= 90) clearInterval(interval);
        setProgress(fakeProgress);
      }, 200);

      const { data } = await uploadThumbnail(formData);

      setProgress(100);
      setTimeout(() => setProgress(0), 700);

      onUpload(data.url);
    } catch (err) {
      console.error("Thumbnail upload error:", err);
      Swal.fire("Thumbnail upload failed");
    }
  };

  return (
    <div>
      <label className="font-medium">Course Thumbnail</label>

      <input
        type="file"
        accept="image/*"
        className="block mt-2"
        onChange={handleThumbnail}
      />

      {/* Progress Bar */}
      {progress > 0 && progress < 100 && (
        <div className="mt-3 w-full">
          <div className="w-full bg-gray-200 h-3 rounded">
            <div
              className="h-3 bg-blue-600 rounded"
              style={{ width: `${progress}%`, transition: "width 0.2s" }}
            ></div>
          </div>
          <p className="text-sm text-gray-700 mt-1">
            Uploaded: {progress}% | Remaining: {100 - progress}%
          </p>
        </div>
      )}

      {/* Preview */}
      {preview && (
        <img
          src={preview}
          alt="preview"
          className="w-40 h-28 object-cover mt-3 rounded shadow"
        />
      )}
    </div>
  );
}
