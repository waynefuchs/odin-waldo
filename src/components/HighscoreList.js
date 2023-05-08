import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";

import Highscore from "./Highscore";

import "../style/HighscoreList.css";

function HighscoreList({ open, setOpen }) {
  const [highscore, setHighscore] = useState([]);

  async function fetchHighscore() {
    // Build the query
    const highscoreRef = collection(db, "highscore");
    const highscoreQuery = query(highscoreRef, orderBy("time"), limit(10));
    const highscoreSnapshot = await getDocs(highscoreQuery);

    // Assign to a list of javascript objects
    const highscoreObj = highscoreSnapshot.docs.map((doc) =>
      Object.assign({ id: doc.id }, doc.data())
    );

    // Update the local state
    console.log("highscore obj", highscoreObj);
    setHighscore(highscoreObj);
  }

  useEffect(() => {
    fetchHighscore();
  }, []);

  function closeDialog(e) {
    setOpen(false);
  }

  return (
    <dialog id="highscore" className={open ? "" : "hidden"}>
      <h1>High Scores</h1>
      <ul>
        {highscore.map((person) => (
          <Highscore key={person.id} person={person} />
        ))}
      </ul>
      <button onClick={closeDialog}>Close</button>
    </dialog>
  );
}

export default HighscoreList;
