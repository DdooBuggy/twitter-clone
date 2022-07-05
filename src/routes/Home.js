import React, { useEffect, useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { dbService } from "../fbase";

const Home = () => {
  const [nweet, setNweet] = useState(""); // nweet form value
  const [nweets, setNweets] = useState([]); // nweets in database
  const getNweets = async () => {
    try {
      const querySnapshot = await getDocs(collection(dbService, "nweet"));
      querySnapshot.forEach((doc) => {
        const nweetObj = { ...doc.data(), id: doc.id };
        setNweets((prev) => [nweetObj, ...prev]);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNweets();
  }, []);
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
      <div>
        {nweets.map((nweet) => (
          <div key={nweet.id}>
            <h4>{nweet.nweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
