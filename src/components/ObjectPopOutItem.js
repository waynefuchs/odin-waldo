function ItemGuess(props) {
  return props.isCrosshairVisible && !props.item.isFound ? (
    <button onClick={props.handleGuess} data-id={props.item.id}>
      {props.item.label}
    </button>
  ) : (
    <p className={props.item.isFound ? "found" : ""}>{props.item.label}</p>
  );
}

export default ItemGuess;
