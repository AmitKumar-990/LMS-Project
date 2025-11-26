import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Pages/login";
import Register from "../Pages/register";
import ForgotPassword from "../Pages/ForgotPassword";
import Home from "../Pages/Home"

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} /> 
      </Routes>
    </BrowserRouter>
  );
}
