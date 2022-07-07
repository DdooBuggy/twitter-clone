import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { dbService } from "../fbase";

const Nweet = ({ nweetObj, isOwner }) => {
  const [isOnEditMode, setIsOnEditMode] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure to delete this nweet?");
    if (ok) {
      await deleteDoc(doc(dbService, "nweet", `${nweetObj.id}`));
    }
  };
  const toggleEditMode = () => {
    setIsOnEditMode((prev) => !prev);
    setNewNweet(nweetObj.text); // initialize newNweet when it canceled
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(doc(dbService, "nweet", `${nweetObj.id}`), {
      text: newNweet,
    });
    setIsOnEditMode(false);
  };
  const onChange = (event) => {
    setNewNweet(event.target.value);
  };
  return (
    <div>
      {isOnEditMode ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="Edit your nweet"
                  value={newNweet}
                  required
                  onChange={onChange}
                />
                <input type="submit" value="Update Nweet" />
              </form>
              <button onClick={toggleEditMode}>Cancel</button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && (
            <img src={nweetObj.attachmentUrl} width="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditMode}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
