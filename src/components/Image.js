import { useId, useState } from "react";

import Crosshair from "./Crosshair";
import PopupSelection from "./PopupSelection";

import "../style/Colors.css";
import "../style/Image.css";

const startingPosition = { x: -500, y: -500 };

function Image(props) {
  const id = useId();
  const [isCrosshairVisible, setCrosshairVisibility] = useState(false);
  const [isObjectSelectionVisible, setObjectSelectionVisibility] =
    useState(false);
  const [positionInDocument, setPositionInDocument] = useState({
    x: startingPosition.x,
    y: startingPosition.y,
  });
  const [pixel, setPixel] = useState({
    x: startingPosition.x,
    y: startingPosition.y,
  });

  const setPopupSelectionPosition = (
    screenClickPosition,
    positionInDocument
  ) => {
    const popupSelectionId = `popup-${id}`;
    const popupSelection = document.getElementById(popupSelectionId);
    console.log(popupSelection);

    const half = {
      width: window.innerWidth / 2,
      height: window.innerHeight / 2,
    };

    if (screenClickPosition.x > half.width) console.log("RIGHT");
    else console.log("LEFT");
    if (screenClickPosition.y > half.height) console.log("BOTTOM");
    else console.log("TOP");

    popupSelection.style.setProperty("left", `${positionInDocument.x}px`, null);
    popupSelection.style.setProperty("top", `${positionInDocument.y}px`, null);

    popupSelection.classList.add("visible");
  };

  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  const handleImageClick = (e) => {
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
    setCrosshairVisibility(true);
    return;

    // I have enough information now to update the UI
    // setCrosshairPosition(positionInDocument);
    setPopupSelectionPosition(
      { x: e.clientX, y: e.clientY },
      positionInDocument
    );

    // Now I need to check if the guess was correct
    //
    // The image is likely scaled, this variable stores that ratio
    const ratio = {
      x: e.target.naturalWidth / e.target.clientWidth,
      y: e.target.naturalHeight / e.target.clientHeight,
    };

    // And that information needs to ber converted to image pixel coordinates
    // e.clientX is used instead of positionInDocuemnt,
    // as scroll value is irrelevant here
    const pixel = {
      x: Math.floor((e.clientX - e.target.x) * ratio.x),
      y: Math.floor((e.clientY - e.target.y) * ratio.y),
    };
    console.log("image pixel coordinates", pixel);
  };

  // The Crosshair and Image go together
  return (
    <>
      <Crosshair
        id={id}
        coord={positionInDocument}
        visible={isCrosshairVisible}
      />
      <PopupSelection search={props.data.search} id={id} />
      <img
        className="image-map"
        src={props.data.src}
        alt={props.data.alt}
        onClick={handleImageClick}
      />
    </>
  );
}

export default Image;
