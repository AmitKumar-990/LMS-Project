import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/enrollments"
});

const authHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

export const userIsEnrolled = (courseId) =>
    API.get(`/check/${courseId}`, authHeader());

export const getMyEnrollments = () =>
    API.get(`/my`, authHeader());