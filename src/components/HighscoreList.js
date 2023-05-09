import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";

import Highscore from "./Highscore";

import "../style/Modal.css";
import "../style/HighscoreList.css";

function HighscoreList({ open, resetGame }) {
  const [highscore, setHighscore] = useState([]);

  // Fetch Highscore
  useEffect(() => {
    const highscoreRef = collection(db, "highscore");
    const highscoreQuery = query(highscoreRef, orderBy("time"), limit(10));
    const unsubscribe = onSnapshot(highscoreQuery, (QuerySnapshot) => {
      const highscoreObj = QuerySnapshot.docs.map((doc) =>
        Object.assign({ id: doc.id }, doc.data())
      );
      setHighscore(highscoreObj);
    });
    return () => unsubscribe;
  }, []);

  function closeDialog(e) {
    resetGame();
  }

  if (!open) return null;
  return (
    <div className="modal">
      <div className="highscore-list">
        <h1>High Scores</h1>

        {highscore.length > 0 ? (
          <ul>
            {highscore.map((person) => (
              <Highscore key={person.id} person={person} />
            ))}
          </ul>
        ) : (
          <p>No high scores yet!</p>
        )}
        <button onClick={closeDialog}>Retry</button>
      </div>
    </div>
  );
}

export default HighscoreList;
