// import { useState } from "react";
// import PopupSelection from "./PopupSelection";
import "../style/Crosshair.css";

function Crosshair({ id, isVisible, coord }) {
  const crosshairId = id ? `crosshair-${id}` : "crosshair";
  const style = { left: coord.x, top: coord.y };
  const className = isVisible ? "crosshair visible" : "crosshair";

  return <div id={crosshairId} className={className} style={style}></div>;
}

export default Crosshair;
