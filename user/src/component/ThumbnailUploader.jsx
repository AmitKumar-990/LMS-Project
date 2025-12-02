import { useState } from "react";
import { uploadThumbnail } from "../api/uploadAPI";

export default function ThumbnailUploader({ onUpload }) {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleThumbnail = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const { data } = await uploadThumbnail(formData);
      onUpload(data.url); // return thumbnail URL to parent component
    } catch (err) {
      console.error("Thumbnail upload error:", err);
      alert("Thumbnail upload failed");
    }
    setLoading(false);
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

      {loading && <p className="text-blue-600 mt-2">Uploading...</p>}

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
