import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signin, Signup, Dashboard, Send } from "./pages";
import axios from "axios";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<Send />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
