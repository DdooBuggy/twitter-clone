import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import EditProfile from "../routes/EditProfile";
import Auth from "../routes/Auth";

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Routes>
      {isLoggedIn ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editprofile" element={<EditProfile />} />
        </>
      ) : (
        <Route path="/" element={<Auth />} />
      )}
    </Routes>
  );
};

export default Router;
