import "../style/Crosshair.css";

function Crosshair(props) {
  const id = `crosshair-${props.id}`;
  return <div id={id} className="crosshair"></div>;
}

export default Crosshair;
