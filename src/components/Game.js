import { useState, useCallback, useEffect } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import Crosshair from "./Crosshair";
import ObjectCounter from "./ObjectCounter";
import ObjectPopOut from "./ObjectPopOut";
import Stopwatch from "./Stopwatch";

import { db } from "../firebase";

import "../style/Colors.css";
import "../style/Image.css";

function createCoordinateObject(x, y) {
  return { x, y };
}

// pythagorean theorem
const isClickCloseEnough = (clickCoord, hiddenObject) => {
  return (
    (clickCoord.y - hiddenObject.y) ** 2 +
      (clickCoord.x - hiddenObject.x) ** 2 <
    hiddenObject.distance ** 2
  );
};

function Game({ puzzle }) {
  const [isGameOver, setIsGameOver] = useState(false);
  const [timeStart, setTimeStart] = useState(new Date());
  const [timeEnd, setTimeEnd] = useState(undefined);
  const [isCrosshairVisible, setIsCrosshairVisible] = useState(false);
  const [crosshairCoordinates, setCrosshairCoordinates] = useState(
    createCoordinateObject(undefined, undefined)
  );
  const [pixelCoordinates, setPixelCoordinates] = useState(
    createCoordinateObject(undefined, undefined)
  );
  const [searchList, setSearchList] = useState([]);
  const [isPopOutVisible, setIsPopOutVisible] = useState(false);

  async function fetchSearch(id) {
    const searchRef = collection(db, `puzzles/${id}/search`);
    const searchSnap = await getDocs(searchRef);
    const searchObj = searchSnap.docs.map((doc) =>
      Object.assign({ id: doc.id }, doc.data())
    );
    setSearchList(searchObj);
    console.log("Search List", searchObj);
  }

  useEffect(() => {
    if (!puzzle?.id) return;
    fetchSearch(puzzle?.id);
  }, [puzzle?.id]);

  function makeGuess(objectId) {
    const hiddenObject = searchList.find((i) => i.id === objectId);
    if (!hiddenObject) return;
    console.log("Guessed", hiddenObject);
    const isCorrect = isClickCloseEnough(pixelCoordinates, hiddenObject);

    if (!isCorrect) {
      console.log("FAILURE.");
      return;
    }

    console.log("Success");
  }

  function calculateCrosshairCoordinates(e) {
    if (isGameOver) return;

    if (isCrosshairVisible) {
      setIsPopOutVisible(false);
      setIsCrosshairVisible(false);
      setCrosshairCoordinates(createCoordinateObject(undefined, undefined));
      return;
    }

    // Enable the pop-out menu
    setIsPopOutVisible(true);

    // Calculate x/y position to place crosshair
    const documentCoordinates = {
      x:
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft,
      y:
        e.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop,
    };
    setIsCrosshairVisible(true);
    setCrosshairCoordinates(documentCoordinates);

    // Calcualte corresponding x/y pixel coordinates in image
    const pixelCoords = {
      x: Math.floor(
        (e.clientX - e.target.x) *
          (e.target.naturalWidth / e.target.clientWidth)
      ),
      y: Math.floor(
        (e.clientY - e.target.y) *
          (e.target.naturalHeight / e.target.clientHeight)
      ),
    };
    setPixelCoordinates(pixelCoords);
  }

  function togglePopOut() {
    setIsPopOutVisible(!isPopOutVisible);
  }

  return (
    <div>
      <Stopwatch
        timeStart={timeStart}
        timeEnd={timeEnd}
        onClick={togglePopOut}
      />
      <ObjectCounter searchList={searchList} onClick={togglePopOut} />

      <Crosshair
        id={puzzle?.id}
        isVisible={isCrosshairVisible}
        coord={crosshairCoordinates}
      />

      <ObjectPopOut
        searchList={searchList}
        isVisible={isPopOutVisible}
        isCrosshairVisible={isCrosshairVisible}
        onMakeGuess={makeGuess}
        onClose={togglePopOut}
      />

      <img
        className="image-map"
        src={puzzle.src}
        alt={puzzle.alt}
        onClick={calculateCrosshairCoordinates}
      />
    </div>
  );
}

export default Game;
