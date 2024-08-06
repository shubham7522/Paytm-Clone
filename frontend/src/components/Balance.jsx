import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../urls";

const Balance = () => {
  const [userBalanse, setUserBalance] = useState();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/account/balance`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setUserBalance(response.data.balance.toFixed(2)));
  }, []);

  return (
    <div className="flex mt-5">
      <div className="font-bold text-lg">Your Balance: </div>
      <div className="font-semibold ml-3 text-lg">{`Rs.${userBalanse}`}</div>
    </div>
  );
};

export default Balance;
