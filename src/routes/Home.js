import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { dbService } from "../fbase";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(dbService, "nweet"), {
        nweet,
        createdAt: Date.now(),
      });
    } catch (error) {
      console.log(error);
    }
    setNweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
    </div>
  );
};

export default Home;
