import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import GameHeader from "./components/GameHeader";
import GameFooter from "./components/GameFooter";
import Image from "./components/Image";
import ObjectPopOut from "./components/ObjectPopOut";

import "./style/Font.css";
import "./style/Colors.css";
import "./style/App.css";
import "./style/Root.css";

import { db } from "./firebase";

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

  const [isObjectPopOutVisible, setIsObjectPopOutVisible] = useState(false);

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

  return (
    <>
      <GameHeader
        searchList={searchList}
        timeObject={timeObject}
        isObjectPopOutVisible={isObjectPopOutVisible}
        setIsObjectPopOutVisible={setIsObjectPopOutVisible}
      />

      <ObjectPopOut
        searchList={searchList}
        isVisible={isObjectPopOutVisible}
        setIsVisible={setIsObjectPopOutVisible}
      />

      <main>
        <Image
          puzzle={puzzle}
          search={searchList}
          setMessage={setMessage}
          located={located}
        />
      </main>

      <GameFooter credit={credit} />
    </>
  );
}

export default App;
