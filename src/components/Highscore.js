import "../style/Highscore.css";

function Highscore({ person }) {
  return (
    <li>
      <div>{person.name}</div>
      <div>{Number(person.time).toFixed(2)} s</div>
    </li>
  );
}

export default Highscore;
