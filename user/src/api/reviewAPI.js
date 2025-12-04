import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/reviews"
});

const auth = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const addReview = (data) => API.post("/add", data, auth());
export const getCourseReviews = (courseId) => API.get(`/${courseId}`);