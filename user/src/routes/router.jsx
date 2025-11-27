import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Pages/login";
import Register from "../Pages/register";
import ForgotPassword from "../Pages/ForgotPassword";
import Home from "../Pages/Home";
import ExploreCourses from "../Pages/ExploreCourses";
import ResetPassword from "../pages/ResetPassword";
import GoogleSuccess from "../Pages/googlesuccess";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/explorecourses" element={<ExploreCourses />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/google-success" element={<GoogleSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}
