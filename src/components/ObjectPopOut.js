// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useState } from "react";
// import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import ItemGuess from "./ItemGuess";
import "../style/ObjectPopOut.css";

function ObjectPopOut(props) {
  function handleClosePopOut(e) {
    props.setIsVisible(false);
  }

  function handleGuess(e) {
    props.guess(e.target.dataset.id);
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
                <ItemGuess
                  item={i}
                  isCrosshairVisible={props.isCrosshairVisible}
                  handleGuess={handleGuess}
                />
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}

export default ObjectPopOut;
