import { doc, deleteDoc } from "firebase/firestore";
import React from "react";
import { dbService } from "../fbase";

const Nweet = ({ nweetObj, isOwner }) => {
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure to delete this nweet?");
    if (ok) {
      await deleteDoc(doc(dbService, "nweet", `${nweetObj.id}`));
    }
  };
  return (
    <div>
      <h4>{nweetObj.text}</h4>
      {isOwner && (
        <>
          <button onClick={onDeleteClick}>Delete Nweet</button>
          <button>Edit Nweet</button>
        </>
      )}
    </div>
  );
};

export default Nweet;
