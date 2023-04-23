import "../style/PopupSelection.css";

function PopupSelection(props) {
  const id = `popup-${props.id}`;
  const style = {
    left: props.coord.x,
    top: props.coord.y,
  };

  return (
    <ul
      id={id}
      className={[
        "popup",
        props.visible ? "visible" : "",
        props.right ? "left" : "right",
      ].join(" ")}
      style={style}
    >
      {props.search.map((item) => (
        <li key={item.id}>
          <button onClick={props.onClick} id={item.id}>
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default PopupSelection;
