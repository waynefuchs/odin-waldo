import { useState, useCallback, useEffect } from "react";

import Crosshair from "./Crosshair";
import PopupSelection from "./PopupSelection";

import "../style/Colors.css";
import "../style/Image.css";

function HiddenObjectImage(props) {
  const id = props.puzzle.id;
  const handleImageClick = (e) => {
    if (props.isGameOver) return;

    if (props.isCrosshairVisible) {
      props.setIsCrosshairVisible(false);
      props.setIsObjectPopOutVisible(false);
      props.setPixel({ x: undefined, y: undefined });
      return;
    }

    // Set the x/y position within <body></body>
    props.setPositionInDocument({
      x:
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft,
      y:
        e.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop,
    });

    // Set the nearest x/y pixel that was clicked on
    props.setPixel({
      x: Math.floor(
        (e.clientX - e.target.x) *
          (e.target.naturalWidth / e.target.clientWidth)
      ),
      y: Math.floor(
        (e.clientY - e.target.y) *
          (e.target.naturalHeight / e.target.clientHeight)
      ),
    });

    // Add the 'visible' class to the crosshair and popup menu
    props.setIsCrosshairVisible(true);
    props.setIsObjectPopOutVisible(true);
  };

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      // ESC key
      props.setIsCrosshairVisible(false);
      props.setIsObjectPopOutVisible(false);
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
        coord={props.positionInDocument}
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
