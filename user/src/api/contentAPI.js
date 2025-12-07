// import axios from "axios";
// const API = axios.create({ baseURL: "http://localhost:5000/api/content" });

// const authHeader = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

// // file upload: send formData with key 'file'
// export const uploadVideoFile = (formData) => API.post("/upload-video", formData, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "multipart/form-data" } });
// export const uploadThumbnailFile = (formData) => API.post("/upload-thumbnail", formData, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "multipart/form-data" } });
// export const uploadPDF = (formData, onUploadProgress) =>
//     API.post("/upload-pdf", formData, {
//         ...authHeader(),
//         headers: {...authHeader().headers, "Content-Type": "multipart/form-data" },
//         onUploadProgress,
//     });

// export const createContent = (data) => API.post("/create", data, authHeader());
// export const deleteContent = (id) => API.delete(`/delete/${id}`, authHeader());




import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/content",
});

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

export const uploadVideo = (formData, onUploadProgress) =>
    API.post("/upload-video", formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        onUploadProgress,
    });

export const uploadThumbnailFile = (formData, onUploadProgress) =>
    API.post("/upload-thumbnail", formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        onUploadProgress,
    });

export const uploadPDF = (formData, onUploadProgress) =>
    API.post("/upload-pdf", formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        onUploadProgress,
    });

export const createContent = (data) =>
    API.post("/create", data, authHeader());

export const deleteContent = (id) =>
    API.delete(`/delete/${id}`, authHeader());