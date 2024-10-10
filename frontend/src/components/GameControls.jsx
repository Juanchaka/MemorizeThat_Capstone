import React from 'react';

function GameControls({ score, time, moves, onEndGame }) {
  return (
    <div className="game-controls">
      <div>Score: {score}</div>
      <div>Time: {time} seconds</div>
      <div>Moves: {moves}</div>
      <button onClick={onEndGame}>End Game</button>
    </div>
  );
}

export default GameControls;