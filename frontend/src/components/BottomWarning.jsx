import React from "react";
import { Link } from "react-router-dom";

const BottomWarning = ({ label, link, to }) => {
  return (
    <div className="flex justify-center my-2">
      <div className="text-sm ">{label}</div>
      <Link to={to}>
        <div className="text-sm ml-1 underline cursor-pointer">{link}</div>
      </Link>
    </div>
  );
};

export default BottomWarning;
