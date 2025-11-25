import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Pages/login";
import Register from "../Pages/register";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
