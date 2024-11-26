import './Board.css';
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
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;