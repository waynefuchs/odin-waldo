// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useState } from "react";
// import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import ItemGuess from "./ItemGuess";
import "../style/ObjectPopOut.css";

function ObjectPopOut({
  searchList,
  isCrosshairVisible,
  isVisible,
  onClose,
  onMakeGuess,
}) {
  function handleGuess(e) {
    onMakeGuess(e.target.dataset.id);
  }

  return (
    <div
      className={["object-pop-out-modal", isVisible ? "" : "hidden"].join(" ")}
    >
      <button className="close-button" onClick={onClose}>
        X
      </button>
      <h1>Search For</h1>
      <ul className="object-pop-out">
        {searchList
          ? searchList.map((i) => (
              <li key={i.id}>
                <ItemGuess
                  item={i}
                  isCrosshairVisible={isCrosshairVisible}
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
