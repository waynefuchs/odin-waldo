import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import Game from "./components/Game";

import { db } from "./firebase";

import "./style/Font.css";
import "./style/Colors.css";
import "./style/App.css";
import "./style/Root.css";

function App() {
  const puzzleId = "7hh6mdB7qXJQDJBuEXFg";
  const [puzzle, setPuzzle] = useState({});

  async function fetchPuzzle(id) {
    const puzzleRef = doc(db, "puzzles", id);
    const puzzleSnap = await getDoc(puzzleRef);
    const puzzleObj = Object.assign({ ...puzzleSnap.data(), id: puzzleRef.id });
    setPuzzle(puzzleObj);
  }

  useEffect(() => {
    fetchPuzzle(puzzleId);
  }, [puzzleId]);

  return <Game puzzle={puzzle} />;
}

export default App;
