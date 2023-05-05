import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

import Highscore from "./Highscore";

import "../style/HighscoreList.css";

function HighscoreList() {
  const [highscore, setHighscore] = useState([]);

  async function fetchHighscore() {
    const highscoreRef = collection(db, "highscore");
    const highscoreSnap = await getDocs(highscoreRef);

    const highscoreObj = highscoreSnap.docs.map((doc) =>
      Object.assign({ id: doc.id }, doc.data())
    );

    console.log("highscore obj", highscoreObj);
    setHighscore(highscoreObj);
  }

  useEffect(() => {
    fetchHighscore();
  }, []);

  return (
    <dialog id="highscore" open>
      <ul>
        {highscore.map((person) => (
          <Highscore key={person.id} person={person} />
        ))}
      </ul>
    </dialog>
  );
}

export default HighscoreList;
