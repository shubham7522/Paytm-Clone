import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "./Button";

const Appbar = () => {
  const [searchParams] = useSearchParams();
  const [userfirstName, setUserFirstName] = useState("");
  const id = searchParams.get("id");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`https://paytm-clone-dedo.onrender.com/api/v1/user/object?filter=${id}`)
      .then((response) => {
        setUserFirstName(response.data.user.firstName);
      });
  }, []);
  return (
    <div className="shadow h-14 flex justify-between rounded-lg">
      <div className="flex flex-col justify-center h-full ml-4 ">
        <p className="font-bold text-2xl">PayTM App</p>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col justify-center h-full mr-4">{`Hello, ${userfirstName}`}</div>
        <div className="rounded-full h-12 w-12 bg-slate-300 flex justify-center mr-4 mt-1">
          <div className="flex flex-col justify-center h-full text-xl">{`${userfirstName[0]}`}</div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <Button
            buttonText={"Logout"}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/signin");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Appbar;
