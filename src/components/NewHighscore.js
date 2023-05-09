import { db } from "../firebase";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

import msToText from "../util/msToText";

import "../style/Modal.css";
import "../style/NewHighscore.css";

function NewHighscore({ time, onClose, newHighscoreOpen, isGameOver }) {
  const [name, setName] = useState("");

  function handleNameChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  async function handleHighscoreSubmit() {
    await addDoc(collection(db, "highscore"), {
      name,
      time,
    });
    if (onClose) onClose();
    else console.warn("Submit clicked, but no callback was defined");
  }

  if (!isGameOver) return null;
  if (!newHighscoreOpen) return null;

  return (
    <div className="modal">
      <div className="new-highscore">
        <h1>{msToText(time)}</h1>
        <label htmlFor="highscoreName">Name</label>
        <input
          id="highscoreName"
          type="text"
          name="highscoreName"
          onChange={handleNameChange}
          maxLength={20}
          placeholder="Your Name..."
          autoComplete="false"
        />
        <button onClick={handleHighscoreSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default NewHighscore;
