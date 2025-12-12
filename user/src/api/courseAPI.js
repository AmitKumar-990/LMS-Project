import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/course",
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const createCourse = (data) => API.post("/create", data);

export const getMyCourses = () => API.get("/my-courses");

export const getCourseById = (id) => API.get(`/${id}`);

export const getAllCourses = () => API.get("/all");

export const updateCourse = (id, data) => API.put(`/update/${id}`, data);

export const deleteCourse = (id) => API.delete(`/delete/${id}`);