import React, { useEffect, useState } from "react";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { query, where, orderBy, collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { dbService } from "../fbase";
import Nweet from "../components/Nweet";

const Profile = ({ userObj, refreshUser }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [myNweets, setMyNweets] = useState([]);
  const onLogOutClick = async () => {
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
    let snapshotArray = [];
    querySnapshot.forEach((doc) =>
      snapshotArray.push({
        id: doc.id,
        data: doc.data(),
      })
    );
    setMyNweets(snapshotArray);
  };
  useEffect(() => {
    getMyNweets();
  }, []);
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
        refreshUser();
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <div className="container">
      <form className="profileForm" onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Profile name"
          value={newDisplayName}
          autoFocus
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
      <div className="myNweets">
        <h4 className="myNweets-title">My Nweets</h4>
        {myNweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet.data}
            isOwner={nweet.data.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
