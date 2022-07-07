import React, { useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { query, where, orderBy, collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { dbService } from "../fbase";

const Profile = ({ userObj }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const onLogoutClick = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const getMyNweets = async () => {
    const nweetRef = collection(dbService, "nweet");
    const nweetsQuery = await query(
      nweetRef,
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(nweetsQuery);
    querySnapshot.forEach((doc) => console.log(doc.id, doc.data()));
  };
  useEffect(() => {
    getMyNweets();
  }, []);
  return (
    <>
      <button onClick={onLogoutClick}>Log out</button>
    </>
  );
};

export default Profile;
