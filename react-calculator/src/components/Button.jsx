import React from "react";

const Button = ({ title, color, onClick }) => {
  return (
    <button
      className={`py-2 text-center button-shadow rounded-md ${color ?? "bg-zinc-700"}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
