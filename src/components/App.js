import React, { useEffect, useState } from "react";
import { fbase } from "../fbase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Router from "./Router";
import Navigation from "./Navigation";

const App = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState();
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        <>
          {isLoggedIn && <Navigation />}
          <Router isLoggedIn={isLoggedIn} userObj={userObj} />
        </>
      ) : (
        <span>Loading...</span>
      )}
    </>
  );
};

export default App;
