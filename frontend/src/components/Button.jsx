import React from "react";

const Button = ({ buttonText, onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="bg-slate-900 py-3 px-4 text-white rounded-lg w-full mt-3 hover:text-slate-900 hover:bg-gray-400"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Button;
