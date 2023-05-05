function Highscore({ person }) {
  return (
    <li>
      <div>{person.name}</div>
      <div>{person.time}</div>
    </li>
  );
}

export default Highscore;
