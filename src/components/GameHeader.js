import "../style/GameHeader.css";
import Stopwatch from "./Stopwatch";

function GameHeader(props) {
  function handlePopOutClick(e) {
    props.setIsObjectPopOutVisible(true);
  }

  return (
    <header>
      <Stopwatch timeObject={props.timeObject} />
      {props.searchList && props.searchList.length > 0 ? (
        <>
          <button className="count-button" onClick={handlePopOutClick}>
            {props.searchList.filter((o) => !o.isFound).length}
          </button>
        </>
      ) : null}
    </header>
  );
}

export default GameHeader;
