import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import Game from "./components/Game";

import { db } from "./firebase";

import "./style/Font.css";
import "./style/Colors.css";
import "./style/App.css";
import "./style/Root.css";

// Generate an object; eventually this will come from the database
// function hiddenObject(id, label, x, y, distance) {
//   return { id, label, x, y, distance };
// }

/**
 * A Hidden Object Game
 * @returns A JSX object containing the entire application
 */
function App() {
  const puzzleId = "7hh6mdB7qXJQDJBuEXFg";
  const [puzzle, setPuzzle] = useState({});

  async function fetchPuzzle(id) {
    const puzzleRef = doc(db, "puzzles", id);
    const puzzleSnap = await getDoc(puzzleRef);
    const puzzleObj = Object.assign({ ...puzzleSnap.data(), id: puzzleRef.id });
    setPuzzle(puzzleObj);
    console.log("Puzzle Object", puzzleObj);
  }

  useEffect(() => {
    fetchPuzzle(puzzleId);
  }, [puzzleId]);

  return <Game puzzle={puzzle} />;
}

export default App;
