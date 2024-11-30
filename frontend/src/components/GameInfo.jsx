import './GameInfo.css';
import React from 'react';
const GameInfo = ({ currentPlayer, thinkingTime, gameStatus, onPause, isPaused }) => {
  return (
    <div className="game-info">
      <div className="status">
        {gameStatus ? (
          <h2>{gameStatus}</h2>
        ) : (
          <h2>Current Player: {currentPlayer === 2 ? 'Red' : 'Yellow'}</h2>
        )}
      </div>
      {thinkingTime !== null && (
        <div className="thinking-time">
          Thinking Time: {thinkingTime.toFixed(2)}s
        </div>
      )}
      <div className="controls">
        <button onClick={onPause}>
          {isPaused ? 'Resume (SPACE)' : 'Pause (SPACE)'}
        </button>
        <p className="hint">Press ESC to exit game</p>
      </div>
    </div>
  );
};

export default GameInfo;