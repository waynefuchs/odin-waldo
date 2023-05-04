import { useState, useCallback, useEffect } from "react";

import Crosshair from "./Crosshair";
// import PopupSelection from "./PopupSelection";

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

function Game({ id, puzzle }) {
  const [isGameOver, setIsGameOver] = useState(false);
  const [isCrosshairVisible, setIsCrosshairVisible] = useState(false);
  const [crosshairCoordinates, setCrosshairCoordinates] = useState(
    createCoordinateObject(undefined, undefined)
  );
  const [pixelCoordinates, setPixelCoordinates] = useState(
    createCoordinateObject(undefined, undefined)
  );

  function disableCrosshair() {
    setIsCrosshairVisible(false);
    setCrosshairCoordinates(createCoordinateObject(undefined, undefined));
  }

  function enableCrosshair(coordinates) {
    setIsCrosshairVisible(true);
    setCrosshairCoordinates(coordinates);
  }

  function calculateCrosshairCoordinates(e) {
    if (isGameOver) return;

    if (isCrosshairVisible) {
      disableCrosshair();
      return;
    }

    const documentCoords = {
      x:
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft,
      y:
        e.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop,
    };
    enableCrosshair(documentCoords);

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

  return (
    <>
      <main>
        <Crosshair
          id={id}
          isVisible={isCrosshairVisible}
          coord={crosshairCoordinates}
        />

        <img
          className="image-map"
          src={puzzle.src}
          alt={puzzle.alt}
          onClick={calculateCrosshairCoordinates}
        />
      </main>
    </>
  );
}

export default Game;

//////////////////////////////////////
{
  /* <GameHeader
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

      <GameFooter credit={credit} /> */
}

//////////////////

// const [message, setMessage] = useState("Welcome!");
// const [found, setFound] = useState([]);
// const [timeObject, setTimeObject] = useState({ start: new Date() });

// const [isObjectPopOutVisible, setIsObjectPopOutVisible] = useState(false);

// const [positionInDocument, setPositionInDocument] = useState({
//   x: undefined,
//   y: undefined,
// });

// const [isGameOver, setIsGameOver] = useState(false);

// function guess(id) {
//   const hiddenObject = searchList.find((item) => item.id === id);
//   if (!hiddenObject) return;

//   if (isClickCloseEnough(pixel, hiddenObject)) {
//     // Player Guessed Correctly
//     setSearchList(
//       searchList.map((i) => {
//         if (i.id === hiddenObject.id) return { ...i, isFound: true };
//         return i;
//       })
//     );

//     clearCrosshair();

//     console.dir(searchList.filter((i) => i.isFound));
//     return;
//   }

//   // Guess was incorrect
//   console.log("Better luck next time.");
// }

// function checkIfPlayerWon() {
//   if (searchList.length === 0) return false;
//   if (isGameOver) return true;
//   if (searchList.filter((i) => i.isFound).length == searchList.length) {
//     // Game is over
//     console.dir(searchList);

//     setIsGameOver(true);
//     return true;
//   }
//   return false;
// }

// function clearCrosshair() {
//   setIsCrosshairVisible(false);
//   setPixel(startingPosition);
// }

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
// function located(id) {
//   setFound([...found, this.search.find((item) => item.id === id)]);
//   setSearchList(this.search.filter((item) => item.id !== id));
//   if (searchList.length > 1) {
//     setMessage("Found it!");
//   } else {
//     setMessage("Congratulations!!! You win!");
//     return true;
//   }
//   return false;
// }

// const id = props.puzzle.id;

// const escFunction = useCallback((event) => {
//   if (event.keyCode === 27) {
//     // ESC key
//     props.setIsCrosshairVisible(false);
//     props.setIsObjectPopOutVisible(false);
//   }
// }, []);

// useEffect(() => {
//   document.addEventListener("keydown", escFunction);
//   return () => {
//     document.removeEventListener("keydown", escFunction);
//   };
// }, [escFunction]);

// The Crosshair and Image go together
