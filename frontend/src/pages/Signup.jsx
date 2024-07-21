import React, { useState } from "react";
import axios from "axios";
import {
  BottomWarning,
  Button,
  Heading,
  InputBox,
  SubHeading,
} from "../components";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  return (
    <section className="bg-slate-300 h-screen flex justify-center ">
      <div className="flex flex-col justify-center ">
        <div className="rounded-lg bg-white m-auto w-80 basis text-center p-2 h-max px-4">
          <Heading label="Sign up" />
          <SubHeading label="Enter the information to create an account" />
          <InputBox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder="John"
            label="First Name"
          />
          <InputBox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder="Doe"
            label="Last Name"
          />
          <InputBox
            onChange={(e) => {
              setEmail(e.target.value);
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
                  "http://localhost:3000/api/v1/user/signup",
                  {
                    username: email,
                    firstName,
                    lastName,
                    password,
                  }
                );

                navigate("/signin");

                // localStorage.setItem("token", response.data.token);
              }}
              buttonText="Sign Up"
            />
          </div>
          <BottomWarning
            label="Already have an account?"
            link="Sign in "
            to="/signin"
          />
        </div>
      </div>
    </section>
  );
};

export default Signup;
