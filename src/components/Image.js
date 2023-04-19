import { useId } from "react";
import Crosshair from "./Crosshair";
import "./Image.css";

function Image(props) {
  const id = useId();

  const moveCrosshair = (target, pixel) => {
    const crosshairId = `crosshair-${id}`;
    const crosshair = document.getElementById(crosshairId);
    pixel.x -= crosshair.offsetWidth / 2;
    pixel.y -= crosshair.offsetHeight / 2;

    crosshair.style.visibility = "visible";
    crosshair.style.setProperty("left", `${pixel.x}px`, null);
    crosshair.style.setProperty("top", `${pixel.y}px`, null);
  };

  const getCoordinates = (e) => {
    // This gets the coordinates of where the user clicked within the document
    // this `positionInDocument` variable is the point within the document on
    // which the crosshair should be placed
    const positionInDocument = {
      x:
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft,
      y:
        e.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop,
    };

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

    moveCrosshair(e.target, positionInDocument);
  };

  return (
    <>
      <Crosshair id={id} />
      <img
        className="image-map"
        src={props.src}
        alt={props.alt}
        onClick={getCoordinates}
      />
    </>
  );
}

export default Image;
