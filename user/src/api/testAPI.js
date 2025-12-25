import axios from "axios";

const API =
    import.meta.env.VITE_API_URL;

export const generateTest = (courseId) => {
    return axios.get(`${API}/test/generate/${courseId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
};