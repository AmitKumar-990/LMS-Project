import React from "react";

export default function PasswordStrengthBar({ strength }) {
  const getColor = () => {
    if (strength === "Weak") return "bg-red-500";
    if (strength === "Medium") return "bg-yellow-500";
    if (strength === "Strong") return "bg-green-500";
    return "bg-gray-300";
  };

  return (
    <div className="w-full h-2 rounded-full bg-gray-200 mt-2">
      <div
        className={`h-2 rounded-full transition-all duration-300 ${getColor()}`}
        style={{
          width:
            strength === "Weak"
              ? "33%"
              : strength === "Medium"
              ? "66%"
              : strength === "Strong"
              ? "100%"
              : "0%",
        }}
      ></div>
    </div>
  );
}
