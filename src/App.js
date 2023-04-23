import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import "./style/Colors.css";
import "./style/App.css";
import Image from "./components/Image";

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
  const [puzzle, setPuzzle] = useState({});
  const [message, setMessage] = useState("Welcome!");
  const [found, setFound] = useState([]);
  const [search, setSearch] = useState([]);

  async function fetchPuzzle(id) {
    const puzzleRef = doc(db, "puzzles", id);
    const puzzleSnap = await getDoc(puzzleRef);
    const puzzleObj = Object.assign(puzzleSnap.data());
    setPuzzle(puzzleObj);

    const searchRef = collection(db, `puzzles/${id}/search`);
    const searchSnap = await getDocs(searchRef);
    const searchObj = searchSnap.docs.map((doc) =>
      Object.assign({ id: doc.id }, doc.data())
    );
    setSearch(searchObj);
  }

  /**
   * Logic dictating what happens when an object is found, including win state
   * @param id The id of the `search` document
   * @returns boolean value indicating whether or not more search objects exist to be found
   */
  function located(id) {
    setFound([...found, this.search.find((item) => item.id === id)]);
    setSearch(this.search.filter((item) => item.id !== id));
    if (search.length > 1) {
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
  }, []);

  return (
    <>
      <header>
        <h1>{message}</h1>

        {search.length ? (
          <div className="search">
            <h2>Things to Find</h2>
            {search.map((item) => (
              <p key={item.id}>{item.label}</p>
            ))}
          </div>
        ) : null}

        {found.length ? (
          <div className="found">
            <h2>Found</h2>
            {found.map((item) => (
              <p key={item.id}>{item.label}</p>
            ))}
          </div>
        ) : null}
      </header>

      <main>
        <Image
          puzzle={puzzle}
          search={search}
          setMessage={setMessage}
          located={located}
        />
      </main>

      <footer>
        <p>Footer</p>
      </footer>
    </>
  );
}

export default App;
