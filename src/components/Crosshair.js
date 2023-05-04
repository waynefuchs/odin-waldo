// import { useState } from "react";
// import PopupSelection from "./PopupSelection";
import "../style/Crosshair.css";

function Crosshair({ id, isVisible, coord }) {
  const crosshairId = `crosshair-${id}`;
  const style = {
    left: coord.x,
    top: coord.y,
  };

  return (
    <div
      id={crosshairId}
      className={isVisible ? "crosshair visible" : "crosshair"}
      style={style}
    ></div>
  );
}

export default Crosshair;
