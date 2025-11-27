import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/auth",
});

// REGISTER
export const registerUser = (data) => API.post("/register", data);

// LOGIN
export const loginUser = (data) => API.post("/login", data);

// FORGOT PASSWORD
export const forgotPassword = (data) => API.post("/forgot-password", data);

// RESET PASSWORD
export const resetPassword = (data) => API.post("/reset-password", data);

// LOGOUT
export const logoutUser = () => API.get("/logout");