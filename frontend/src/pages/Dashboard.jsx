import React from "react";
import { Appbar, Balance, Users } from "../components";

const Dashboard = () => {
  return (
    <div className="bg-slate-200 h-screen flex flex-col items-center ">
      <div className="flex flex-col w-full basis-[100%] items-center h-max">
        <div className="bg-white rounded-lg w-[95%] p-4 my-4 shadow-md shadow-slate-900">
          <Appbar />
          <Balance />
          <Users />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
