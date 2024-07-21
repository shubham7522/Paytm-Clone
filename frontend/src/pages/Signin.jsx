import React, { useState, useEffect } from "react";
import {
  BottomWarning,
  Button,
  Heading,
  InputBox,
  SubHeading,
} from "../components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/user/bulk?filter=${username}`)
      .then((response) => {
        setUserId(response.data.user[0]._id);
        console.log(response.data.user[0]._id);
      });
  }, [username]);

  return (
    <section className="bg-slate-300 h-screen flex justify-center ">
      <div className="flex flex-col justify-center ">
        <div className="rounded-lg bg-white m-auto w-80 basis text-center p-2 h-max px-4">
          <Heading label="Sign in" />
          <SubHeading label="Enter your credentials to access your account" />
          <InputBox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="example123@gmail.com"
            label="Email"
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="12345"
            label="Password"
          />
          <div>
            <Button
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signin",
                  {
                    username,
                    password,
                  }
                );
                localStorage.setItem("token", response.data.token);
                navigate(`/dashboard?id=${userId}`);
              }}
              buttonText="Sign In"
            />
          </div>

          <BottomWarning
            label="Don't have an account?"
            link="Sign Up"
            to="/signup"
          />
        </div>
      </div>
    </section>
  );
};

export default Signin;
