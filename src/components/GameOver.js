function GameOver({ isGameOver }) {
  return isGameOver ? null : <div className="game-over"></div>;
}

export default GameOver;
