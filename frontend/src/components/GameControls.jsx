import React from 'react';

function GameControls({ score, time, onEndGame }) {
  return (
    <div className="game-controls">
      <div>Score: {score}</div>
      <div>Time: {time} seconds</div>
      <button onClick={onEndGame}>End Game</button>
    </div>
  );
}

export default GameControls;