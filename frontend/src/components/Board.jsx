import './Board.css';
import yellowPlayer from '../assets/yellow.png';
import redPlayer from '../assets/red.png';

const Board = ({ board, onColumnClick, gameActive, evaluationScores }) => {
  const rows = 6;
  const cols = 7;

  return (
    <div className="board">
      {evaluationScores && (
        <div className="evaluation-scores">
          {evaluationScores.map((score, col) => (
            <div key={`score-${col}`} className="score">
              {score !== null ? score.toFixed(2) : '-'}
            </div>
          ))}
        </div>
      )}
      <div className="columns">
        {Array(cols).fill(null).map((_, col) => (
          <div
            key={col}
            className="column"
            onClick={() => gameActive && onColumnClick(col)}
          >
            {Array(rows).fill(null).map((_, row) => (
              <div
                key={`${row}-${col}`}
                className={`cell player${board[row][col]}`}
              >
                {board[row][col] === 1 && (
                  <img
                    src={yellowPlayer}
                    alt="Player 1"
                    className="player-icon"
                  />
                )}
                {board[row][col] === 2 && (
                  <img
                    src={redPlayer}
                    alt="Player 2"
                    className="player-icon"
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
