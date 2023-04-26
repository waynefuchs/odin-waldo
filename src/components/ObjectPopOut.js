import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import "../style/ObjectPopOut.css";

function ObjectPopOut(props) {
  function handleClosePopOut(e) {
    props.setIsVisible(false);
  }

  return (
    <div
      className={["object-pop-out-modal", props.isVisible ? "" : "hidden"].join(
        " "
      )}
    >
      <button className="close-button" onClick={handleClosePopOut}>
        X
      </button>
      <h1>Search For</h1>
      <ul className="object-pop-out">
        {props.searchList
          ? props.searchList.map((i) => (
              <li key={i.id}>
                {props.isCrosshairVisible ? (
                  <button>{i.label}</button>
                ) : (
                  <p>{i.label}</p>
                )}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}

export default ObjectPopOut;
