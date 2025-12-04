import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/analytics"
});

const authHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

export const getInstructorStats = () =>
    API.get("/instructor", authHeader());