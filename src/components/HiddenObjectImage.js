import { useState, useCallback, useEffect } from "react";

import Crosshair from "./Crosshair";
import PopupSelection from "./PopupSelection";

import "../style/Colors.css";
import "../style/Image.css";

const startingPosition = { x: undefined, y: undefined };

function HiddenObjectImage(props) {
  const id = props.puzzle.id;
  const [isGameOver, setIsGameOver] = useState(false);
  const [isObjectSelectionVisible, setObjectSelectionVisibility] =
    useState(false);
  const [hasClickedOnRightSide, setHasClickedOnRightSide] = useState(false); // A prop to pass down to let the Object Selection menu popup know which side of the crosshair to render the menu on
  const [positionInDocument, setPositionInDocument] = useState({
    x: startingPosition.x,
    y: startingPosition.y,
  });
  const [pixel, setPixel] = useState({
    x: startingPosition.x,
    y: startingPosition.y,
  });

  const isClickCloseEnough = (clickCoord, hiddenObject) => {
    // pythagorean theorem
    return (
      (clickCoord.y - hiddenObject.y) ** 2 +
        (clickCoord.x - hiddenObject.x) ** 2 <
      hiddenObject.distance ** 2
    );
  };

  const handleImageClick = (e) => {
    if (isGameOver) return;

    // Set the x/y position within <body></body>
    setPositionInDocument({
      x:
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft,
      y:
        e.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop,
    });

    // Determine the 'pixel' that was clicked on
    // I use this information to calculate the position of the image, and apply scaling to determine which pixel was clicked.
    // e.client(X/Y): Where in the window the user clicked
    // e.target.(x/y): The offset of the clicked element on the page. (eg: `top` and `left` values)
    // e.target.natural(Height/Width): The number of pixels, as would be reported by photoshop
    // e.target.client(Height/Width): The number of pixels currently being rendered by the browser
    setPixel({
      x: Math.floor(
        (e.clientX - e.target.x) *
          (e.target.naturalWidth / e.target.clientWidth)
      ),
      y: Math.floor(
        (e.clientY - e.target.y) *
          (e.target.naturalHeight / e.target.clientHeight)
      ),
    });

    // determine whether the user clicked/tapped on the right or left side of the screen
    setHasClickedOnRightSide(e.clientX > window.innerWidth / 2);

    // Add the 'visible' class to the crosshair and popup menu
    props.setIsCrosshairVisible(true);
    // setObjectSelectionVisibility(true);
  };

  const handleObjectButtonClick = (e) => {
    const objectId = e.target.id;
    const hiddenObject = props.search.find((item) => item.id === objectId);
    // Early out, if no object was found
    if (!hiddenObject) return;

    if (isClickCloseEnough(pixel, hiddenObject)) {
      const gameOver = props.located(objectId);
      setIsGameOver(gameOver);
      props.setIsCrosshairVisible(false);
      // setObjectSelectionVisibility(false);
    } else {
      props.setMessage("Try again!");
    }
  };

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      // ESC key
      props.setIsCrosshairVisible(false);
      setObjectSelectionVisibility(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction);
    return () => {
      document.removeEventListener("keydown", escFunction);
    };
  }, [escFunction]);

  // The Crosshair and Image go together
  return (
    <>
      <Crosshair
        id={id}
        coord={positionInDocument}
        visible={props.isCrosshairVisible}
      />

      <img
        className="image-map"
        src={props.puzzle.src}
        alt={props.puzzle.alt}
        onClick={handleImageClick}
      />
    </>
  );
}

export default HiddenObjectImage;
