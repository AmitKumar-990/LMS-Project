import axios from "axios";

const API =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const updateUserProgress = (courseId, body) => {
    return axios.post(`${API}/progress/update/${courseId}`, body, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};

export const getUserProgress = (courseId) => {
    return axios.get(`${API}/progress/${courseId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};