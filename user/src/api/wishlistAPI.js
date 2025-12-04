import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/wishlist"
});

const auth = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const toggleWishlist = (courseId) =>
    API.post("/toggle", { courseId }, auth());

export const getMyWishlist = () =>
    API.get("/my", auth());