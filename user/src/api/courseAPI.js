import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000/api/course" });

const authHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const createCourse = (data) => API.post("/create", data, authHeader());
export const getMyCourses = () => API.get("/my-courses", authHeader());
export const getCourseById = (id) => API.get(`/${id}`, authHeader());
export const updateCourse = (id, data) => API.put(`/update/${id}`, data, authHeader());
export const deleteCourse = (id) => API.delete(`/delete/${id}`, authHeader());