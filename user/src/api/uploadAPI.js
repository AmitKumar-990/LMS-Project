import axios from "axios";

axios.defaults.adapter = "xhr";

const API = axios.create({
    baseURL: "http://localhost:5000/api/content",
});

export const uploadThumbnail = (formData, onUploadProgress) =>
    API.post("/upload-thumbnail", formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
    });

export const uploadVideoFile = (formData, onUploadProgress) =>
    API.post("/upload-video", formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
    });