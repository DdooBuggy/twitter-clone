import React, { useState } from "react";
import { fbase } from "../fbase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Router from "./Router";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLoggedIn(true);
      const uid = user.uid;
      console.log(user);
    } else {
      setIsLoggedIn(false);
    }
  });
  return <Router isLoggedIn={isLoggedIn} />;
};

export default App;
