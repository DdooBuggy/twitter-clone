import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useState } from "react";
import { dbService, storageService } from "../fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner }) => {
  const [isOnEditMode, setIsOnEditMode] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure to delete this nweet?");
    if (ok) {
      try {
        await deleteDoc(doc(dbService, "nweet", `${nweetObj.id}`));
        if (nweetObj.attachmentUrl) {
          await deleteObject(ref(storageService, nweetObj.attachmentUrl));
        }
      } catch (e) {
        console.log(e);
        window.alert("Deleting the nweet failed");
      }
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
    <div className="nweet">
      {isOnEditMode ? (
        <>
          {isOwner && (
            <>
              <form className="container nweetEdit" onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="Edit your nweet"
                  value={newNweet}
                  required
                  autoFocus
                  className="formInput"
                  onChange={onChange}
                />
                <input className="formBtn" type="submit" value="Update Nweet" />
              </form>
              <span onClick={toggleEditMode} className="formBtn cancelBtn">
                Cancel
              </span>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditMode}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
