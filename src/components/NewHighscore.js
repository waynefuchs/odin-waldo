import { db } from "../firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

import msToText from "../util/msToText";

import "../style/Modal.css";
import "../style/NewHighscore.css";

function NewHighscore({ time }) {
  const [highscoreName, setHighscoreName] = useState("");

  function handleNameChange(e) {
    e.preventDefault();
    setHighscoreName(e.target.value);
  }

  return (
    <div class="modal">
      <div class="new-highscore">
        <h1>{msToText(time)}</h1>
        <label htmlFor="highscoreName">Name {highscoreName}</label>
        <input
          id="highscoreName"
          type="text"
          name="highscoreName"
          onChange={handleNameChange}
        />
        <button>Submit</button>
      </div>
    </div>
  );
}

export default NewHighscore;
