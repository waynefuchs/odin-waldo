import "../style/PopupSelection.css";

function PopupSelection(props) {
  const id = `popup-${props.id}`;

  return (
    <ul className="popup" id={id}>
      {props.search.map((item) => (
        <li key={item.id}>
          <button>{item.label}</button>
        </li>
      ))}
    </ul>
  );
}

export default PopupSelection;
