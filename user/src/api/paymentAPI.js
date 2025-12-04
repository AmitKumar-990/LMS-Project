import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000/api/payments" });

const authHeader = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const createPaymentIntent = (courseId) => API.post("/create-payment-intent", { courseId }, authHeader());
export const confirmPayment = (paymentIntentId) => API.post("/confirm", { paymentIntentId }, authHeader());