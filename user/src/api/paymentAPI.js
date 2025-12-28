import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/payments",
});

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const createCheckoutSession = (courseId) =>
  API.post(
    "/create-checkout-session",
    { courseId },
    authHeader()
  );
