import "../style/GameOver.css";

function GameOver({ isGameOver }) {
  if (!isGameOver) return null;
  return <div className="game-over"></div>;
}

export default GameOver;
