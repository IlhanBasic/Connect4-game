import './GameConfig.css';
import React from 'react';

const GameConfig = ({ onStartGame }) => {
  const [gameType, setGameType] = React.useState('human-human');
  const [difficulty, setDifficulty] = React.useState('easy');
  const [loadFromFile, setLoadFromFile] = React.useState(false);
  const [gameFile, setGameFile] = React.useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileContent = e.target.result;
            const moves = fileContent
                .split('\n') // Razdvajanje linija
                .map(line => line.trim()) // Uklanjanje praznina
                .filter(line => line !== '' && !isNaN(line)) // Ignorisanje praznih linija i ne-numeričkih vrednosti
                .map(Number); // Konvertovanje u brojeve
            setGameFile(moves); // Čuvamo niz poteza
        };
        reader.readAsText(file);
    }
};
  console.log('Load from file:', loadFromFile);
  const handleSubmit = (e) => {
    e.preventDefault();
    onStartGame({
      gameType,
      difficulty,
      initialState: loadFromFile ? gameFile : null, // Prosleđuje poteze ako je fajl učitan
    });
  };

  return (
    <form onSubmit={handleSubmit} className="game-config">
      <div>
        <label>Game Type:</label>
        <select value={gameType} onChange={(e) => setGameType(e.target.value)}>
          <option value="human-human">Human vs Human</option>
          <option value="human-computer">Human vs Computer</option>
          <option value="computer-computer">Computer vs Computer</option>
        </select>
      </div>

      <div>
        <label>Difficulty:</label>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="expert">Expert</option>
        </select>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={loadFromFile}
            onChange={(e) => setLoadFromFile(e.target.checked)}
          />
          Load Game State from File
        </label>
      </div>

      {loadFromFile && (
        <div>
          <label>Choose Game File:</label>
          <input type="file" accept=".txt" onChange={handleFileChange} />
        </div>
      )}

      <button type="submit">Start Game</button>
    </form>
  );
};

export default GameConfig;
