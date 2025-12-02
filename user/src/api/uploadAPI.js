import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/content",
});

// Upload course thumbnail (image)
export const uploadThumbnail = (formData) =>
    API.post("/upload-thumbnail", formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
        },
    });

// Upload lecture video
export const uploadVideoFile = (formData) =>
    API.post("/upload-video", formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
        },
    });