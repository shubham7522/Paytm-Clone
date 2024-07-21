import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const Appbar = () => {
  const [searchParams] = useSearchParams();
  const [userfirstName, setUserFirstName] = useState("");
  const id = searchParams.get("id");
  const objectId = `ObjectId('${id}')`;
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/user/object?filter=${id}`)
      .then((response) => {
        setUserFirstName(response.data.user.firstName);
      });
  }, []);
  return (
    <div className="shadow h-14 flex justify-between rounded-lg">
      <div className="flex flex-col justify-center h-full ml-4 ">
        <p className="font-bold text-2xl">PayTM App</p>
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">{`Hello, ${userfirstName}`}</div>
        <div className="rounded-full h-12 w-12 bg-slate-300 flex justify-center mr-4 mt-1">
          <div className="flex flex-col justify-center h-full text-xl">{`${userfirstName[0]}`}</div>
        </div>
      </div>
    </div>
  );
};

export default Appbar;