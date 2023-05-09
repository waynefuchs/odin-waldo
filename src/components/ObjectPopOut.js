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

  if (!searchList) return null;
  return (
    <div
      className={["object-pop-out-modal", isVisible ? "" : "hidden"].join(" ")}
    >
      <button className="close-button" onClick={onClose}>
        X
      </button>
      <h1>Search For</h1>
      <ul className="object-pop-out">
        {searchList.map((item) => (
          <li key={item.id}>
            <ItemGuess
              item={item}
              isCrosshairVisible={isCrosshairVisible}
              handleGuess={handleGuess}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ObjectPopOut;
