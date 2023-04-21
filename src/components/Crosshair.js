import { useState } from "react";
import PopupSelection from "./PopupSelection";
import "../style/Crosshair.css";

function Crosshair(props) {
  const id = `crosshair-${props.id}`;
  const style = {
    left: props.coord.x,
    top: props.coord.y,
  };

  return (
    <div
      id={id}
      className={props.visible ? "crosshair visible" : "crosshair"}
      style={style}
    ></div>
  );
}

export default Crosshair;
