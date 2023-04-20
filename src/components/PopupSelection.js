import "../style/PopupSelection.css";

function PopupSelection(props) {
  const id = `popup-${props.id}`;

  return (
    <ul className="popup" id={id}>
      {props.search.map((item) => (
        <li>{item.label}</li>
      ))}
    </ul>
  );
}

export default PopupSelection;
