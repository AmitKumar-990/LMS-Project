import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000/api/chapter" });

const authHeader = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const createChapter = (data) => API.post("/create", data, authHeader());
export const updateChapter = (id, data) => API.put(`/update/${id}`, data, authHeader());
export const deleteChapter = (id) => API.delete(`/delete/${id}`, authHeader());