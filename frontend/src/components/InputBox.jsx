import React from "react";

const InputBox = ({ placeholder, label, onChange }) => {
  return (
    <div>
      <div className="font-bold text-left">{label}</div>
      <input
        onChange={onChange}
        className="px-2 py-1.5 border rounded-md w-full my-2"
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputBox;
