import React, { useEffect, useState } from "react";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { query, where, orderBy, collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { dbService } from "../fbase";

const Profile = ({ userObj }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogoutClick = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  // const getMyNweets = async () => {
  //   const nweetRef = collection(dbService, "nweet");
  //   const nweetsQuery = await query(
  //     nweetRef,
  //     where("creatorId", "==", userObj.uid),
  //     orderBy("createdAt", "desc")
  //   );
  //   const querySnapshot = await getDocs(nweetsQuery);
  //   querySnapshot.forEach((doc) => console.log(doc.id, doc.data()));
  // };
  // useEffect(() => {
  //   getMyNweets();
  // }, []);
  const onChange = (event) => {
    setNewDisplayName(event.target.value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      try {
        await updateProfile(auth.currentUser, {
          displayName: newDisplayName,
        });
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Profile name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogoutClick}>Log out</button>
    </>
  );
};

export default Profile;
