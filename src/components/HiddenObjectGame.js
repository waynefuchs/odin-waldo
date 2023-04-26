import { useState, useCallback, useEffect } from "react";

import Crosshair from "./Crosshair";
import PopupSelection from "./PopupSelection";

import "../style/Colors.css";
import "../style/Image.css";

const startingPosition = { x: undefined, y: undefined };

/**
 * Component to create a hidden object puzzle image
 * @param props React state
 * @param props.src The url to the puzzle image
 * @param props.alt The alt text for the image
 * @param props.alt.search An array of objects containing {`id`, `label`, `x`, `y`, `distance`}
 * @returns A JSX object containing the Image, a Crosshair, and the Hidden Object popup menu
 */
function HiddenObjectGame(props) {
  const id = props.puzzle.id;
  const [isGameOver, setIsGameOver] = useState(false);
  const [isCrosshairVisible, setCrosshairVisibility] = useState(false); // A prop to pass down for crosshair visibility
  const [isObjectSelectionVisible, setObjectSelectionVisibility] =
    useState(false); // A prop to pass down for the Object Selection menu popup
  const [hasClickedOnRightSide, setHasClickedOnRightSide] = useState(false); // A prop to pass down to let the Object Selection menu popup know which side of the crosshair to render the menu on
  const [positionInDocument, setPositionInDocument] = useState({
    x: startingPosition.x,
    y: startingPosition.y,
  }); // A prop to assign an x/y "clicked" coordinate (within <body></body>)
  const [pixel, setPixel] = useState({
    x: startingPosition.x,
    y: startingPosition.y,
  }); // A prop to assign an x/y pixel that was clicked on. This is used to determine if a guess is correct

  /**
   * Determine if the user clicked within some specified distance
   * from the target in question.
   * @param clickCoord Pixel coordinates where the user clicked
   * @param clickCoord.x The 'x' component
   * @param clickCoord.y The 'y' component
   * @param hiddenObject Description of the hidden object
   * @param hiddenObject.x The 'x' component
   * @param hiddenObject.y The 'y' component
   * @param hiddenObject.distance The maximum distance allowed between click and object
   */
  const isClickCloseEnough = (clickCoord, hiddenObject) => {
    // This is the pythagorean theorem (a^2 + b^2 = c^2), and I also square the hiddenObject.distance to avoid using Math.sqrt()
    return (
      (clickCoord.y - hiddenObject.y) ** 2 +
        (clickCoord.x - hiddenObject.x) ** 2 <
      hiddenObject.distance ** 2
    );
  };

  /**
   * Crosshair and menu set up; called when the image is clicked
   * @param {Event} e The event, supplied by js
   */
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
    setCrosshairVisibility(true);
    setObjectSelectionVisibility(true);
  };

  /**
   * Handle a button click within the popup menu
   * @param e The event, supplied by js
   */
  const handleObjectButtonClick = (e) => {
    const objectId = e.target.id;
    const hiddenObject = props.search.find((item) => item.id === objectId);
    // Early out, if no object was found
    if (!hiddenObject) return;

    if (isClickCloseEnough(pixel, hiddenObject)) {
      const gameOver = props.located(objectId);
      setIsGameOver(gameOver);
      setCrosshairVisibility(false);
      setObjectSelectionVisibility(false);
    } else {
      props.setMessage("Try again!");
    }
  };

  /**
   * Configure the escape button
   */
  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      // ESC key
      // hide the crosshair
      // hide the 'hidden object popup menu'
      setCrosshairVisibility(false);
      setObjectSelectionVisibility(false);
    }
  }, []);

  /**
   * Register the escape button
   */
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
        visible={isCrosshairVisible}
      />
      {/* <PopupSelection
        id={id}
        search={props.search}
        coord={positionInDocument}
        right={hasClickedOnRightSide}
        visible={isObjectSelectionVisible}
        onClick={handleObjectButtonClick}
      /> */}
      <img
        className="image-map"
        src={props.puzzle.src}
        alt={props.puzzle.alt}
        onClick={handleImageClick}
      />
    </>
  );
}

export default HiddenObjectGame;
