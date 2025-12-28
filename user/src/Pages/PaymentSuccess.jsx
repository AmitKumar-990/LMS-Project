// PaymentSuccess.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(
        "http://localhost:5000/api/enrollments/my",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();

      if (data.length > 0) {
        clearInterval(interval);
        navigate("/my-courses");
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen flex items-center justify-center text-lg">
      Finalizing your enrollment…
    </div>
  );
}
