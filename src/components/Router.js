import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Auth from "../routes/Auth";

const Router = ({ isLoggedIn, userObj, refreshUser }) => {
  return (
    <Routes>
      {isLoggedIn ? (
        <>
          <Route path="/" element={<Home userObj={userObj} />} />
          <Route
            path="/profile"
            element={<Profile userObj={userObj} refreshUser={refreshUser} />}
          />
        </>
      ) : (
        <Route path="/" element={<Auth />} />
      )}
    </Routes>
  );
};

export default Router;
