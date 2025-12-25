import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GoogleSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      console.error("Google login failed: No token");
      navigate("/login");
      return;
    }

    localStorage.setItem("token", token);

    // Small delay to ensure storage is written
    setTimeout(() => {
      navigate("/home");
    }, 300);
  }, [navigate]);

  return <p>Logging you in with Google...</p>;
}
