import "../style/Highscore.css";

import msToText from "../util/msToText";

function Highscore({ person }) {
  return (
    <li>
      <div>{person.name}</div>
      <div>{msToText(Number(person.time))}</div>
    </li>
  );
}

export default Highscore;
