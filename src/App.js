import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import GameHeader from "./components/GameHeader";
import GameFooter from "./components/GameFooter";
import HiddenObjectImage from "./components/HiddenObjectImage";
import ObjectPopOut from "./components/ObjectPopOut";

import "./style/Font.css";
import "./style/Colors.css";
import "./style/App.css";
import "./style/Root.css";

import { db } from "./firebase";

const startingPosition = { x: undefined, y: undefined };

const isClickCloseEnough = (clickCoord, hiddenObject) => {
  // pythagorean theorem
  return (
    (clickCoord.y - hiddenObject.y) ** 2 +
      (clickCoord.x - hiddenObject.x) ** 2 <
    hiddenObject.distance ** 2
  );
};

// Generate an object; eventually this will come from the database
// function hiddenObject(id, label, x, y, distance) {
//   return { id, label, x, y, distance };
// }

/**
 * A Hidden Object Game
 * @returns A JSX object containing the entire application
 */
function App() {
  const [credit, setCredit] = useState({});
  const [message, setMessage] = useState("Welcome!");
  const [found, setFound] = useState([]);
  const [timeObject, setTimeObject] = useState({ start: new Date() });

  const [puzzle, setPuzzle] = useState({});
  const [searchList, setSearchList] = useState([]);

  const [isCrosshairVisible, setIsCrosshairVisible] = useState(false); // A prop to pass down for crosshair visibility
  const [isObjectPopOutVisible, setIsObjectPopOutVisible] = useState(false);

  const [positionInDocument, setPositionInDocument] = useState({
    x: undefined,
    y: undefined,
  });

  const [pixel, setPixel] = useState({
    x: startingPosition.x,
    y: startingPosition.y,
  });
  const [isGameOver, setIsGameOver] = useState(false);

  function guess(id) {
    const hiddenObject = searchList.find((item) => item.id === id);
    if (!hiddenObject) return;

    if (isClickCloseEnough(pixel, hiddenObject)) {
      // Player Guessed Correctly
      setSearchList(
        searchList.map((i) => {
          if (i.id === hiddenObject.id) return { ...i, isFound: true };
          return i;
        })
      );

      clearCrosshair();

      console.dir(searchList.filter((i) => i.isFound));
      return;
    }

    // Guess was incorrect
    console.log("Better luck next time.");
  }

  function checkIfPlayerWon() {
    if (searchList.length === 0) return false;
    if (isGameOver) return true;
    if (searchList.filter((i) => i.isFound).length == searchList.length) {
      // Game is over
      console.dir(searchList);

      setIsGameOver(true);
      return true;
    }
    return false;
  }

  function clearCrosshair() {
    setIsCrosshairVisible(false);
    setPixel(startingPosition);
  }

  /**
   * Get the image information
   * @param {String} id Correspond to Firestore puzzle id
   */
  async function fetchPuzzle(id) {
    const puzzleRef = doc(db, "puzzles", id);
    const puzzleSnap = await getDoc(puzzleRef);
    const puzzleObj = Object.assign(puzzleSnap.data());
    setPuzzle(puzzleObj);

    const creditObject = {};
    if (puzzleObj.author) creditObject.author = puzzleObj.author;
    if (puzzleObj.title) creditObject.title = puzzleObj.title;
    if (puzzleObj.etsy) creditObject.etsy = puzzleObj.etsy;
    if (puzzleObj.instagram) creditObject.instagram = puzzleObj.instagram;
    if (puzzleObj.reddit) creditObject.reddit = puzzleObj.reddit;
    setCredit(creditObject);
  }

  /**
   * Get the search object data
   * @param {String} id Correspond to the Firestore puzzle id
   */
  async function fetchSearch(id) {
    const searchRef = collection(db, `puzzles/${id}/search`);
    const searchSnap = await getDocs(searchRef);
    const searchObj = searchSnap.docs.map((doc) =>
      Object.assign({ id: doc.id }, doc.data())
    );
    setSearchList(searchObj);
  }

  /**
   * Logic dictating what happens when an object is found, including win state
   * @param id The id of the `search` document
   * @returns boolean value indicating whether or not more search objects exist to be found
   */
  function located(id) {
    setFound([...found, this.search.find((item) => item.id === id)]);
    setSearchList(this.search.filter((item) => item.id !== id));
    if (searchList.length > 1) {
      setMessage("Found it!");
    } else {
      setMessage("Congratulations!!! You win!");
      return true;
    }
    return false;
  }

  useEffect(() => {
    // I originally intended to allow user selection between multiple puzzles
    const puzzleId = "7hh6mdB7qXJQDJBuEXFg";
    fetchPuzzle(puzzleId);
    fetchSearch(puzzleId);
  }, []);

  const myList = ["abc", "def", "ghi"];

  return (
    <>
      <ul>{myList}</ul>
      <div>fuck</div>
      <GameHeader
        searchList={searchList}
        timeObject={timeObject}
        isObjectPopOutVisible={isObjectPopOutVisible}
        setIsObjectPopOutVisible={setIsObjectPopOutVisible}
        isGameOver={isGameOver}
      />

      {checkIfPlayerWon() ? <h1>You win!</h1> : null}

      <ObjectPopOut
        searchList={searchList}
        isVisible={isObjectPopOutVisible}
        setIsVisible={setIsObjectPopOutVisible}
        isCrosshairVisible={isCrosshairVisible}
        setIsCrosshairVisible={setIsCrosshairVisible}
        guess={guess}
      />

      <main>
        <HiddenObjectImage
          puzzle={puzzle}
          search={searchList}
          setMessage={setMessage}
          located={located}
          isCrosshairVisible={isCrosshairVisible}
          setIsCrosshairVisible={setIsCrosshairVisible}
          pixel={pixel}
          setPixel={setPixel}
          positionInDocument={positionInDocument}
          setPositionInDocument={setPositionInDocument}
          setIsObjectPopOutVisible={setIsObjectPopOutVisible}
          isGameOver={isGameOver}
        />
      </main>

      <GameFooter credit={credit} />
    </>
  );
}

export default App;
