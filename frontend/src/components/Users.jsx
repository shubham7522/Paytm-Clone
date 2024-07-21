import React, { useState, useEffect } from "react";
import Button from "./Button";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

const Users = () => {
  // replace with backend call

  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}&id=${id}`)
      .then((response) => {
        setUsers(response.data.user);
      });
  }, [filter]);

  return (
    <>
      <div className="font-bold mt-5 font-xl">Users</div>
      <div className="my-2">
        <input
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          type="text"
          placeholder="Search Users...."
          className="w-full px-2 py-2 border border-slate-300 rounded-lg"
        />
      </div>
      <div>
        {users.map((user) => (
          <User user={user} key={user.id} />
        ))}
      </div>
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between my-2">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-300 flex justify-center mt-1 mr-4">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center h-full">
        <Button
          onClick={(e) => {
            navigate(`/send?id=${user._id}&name=${user.firstName}`);
          }}
          buttonText="Send Money"
        />
      </div>
    </div>
  );
}

export default Users;
