import "../style/ObjectCounter.css";

function ObjectCounter({ onClick, searchList }) {
  return searchList && searchList.filter((o) => !o.isFound).length > 0 ? (
    <>
      <button className="count-button" onClick={onClick}>
        {searchList.filter((o) => !o.isFound).length}
      </button>
    </>
  ) : null;
}

export default ObjectCounter;
