import React, { useEffect, useState } from "react";
import { fbase } from "../fbase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Router from "./Router";

const App = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return <>{init ? <Router isLoggedIn={isLoggedIn} /> : "Loading..."}</>;
};

export default App;
