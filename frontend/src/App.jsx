import React, { useState, useEffect, useCallback } from 'react';
import Board from './components/Board';
import GameConfig from './components/GameConfig';
import GameInfo from './components/GameInfo';
import api from './utils/api';
import './App.css';

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameId, setGameId] = useState(null);
  const [board, setBoard] = useState(Array(6).fill().map(() => Array(7).fill(0)));
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [gameStatus, setGameStatus] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [thinkingTime, setThinkingTime] = useState(null);
  const [gameType, setGameType] = useState('');

  const initializeGame = async (config) => {
    const gameConfig = {
      game_type: config.gameType, 
      difficulty: config.difficulty,
      initial_state: config.initialState,  
    };
  
    console.log('Game configuration:', gameConfig);
    try {
      const game = await api.createGame(gameConfig);  
      setGameId(game.id);
      setBoard(game.board_state);
      setCurrentPlayer(game.current_player);
      setGameType(config.gameType);  // Store the game type
      setGameStarted(true);
      setGameStatus(null);
      setIsPaused(false);
      setThinkingTime(null);
    } catch (error) {
      console.error('Error initializing game:', error);
    }
  };

  // Function to simulate computer move
  const simulateComputerMove = useCallback(async () => {
    if (gameStatus || isPaused || gameType === 'human-human') return;

    // Simulate the computer selecting a random column
    const availableColumns = board[0].map((_, index) => index).filter(col => board[0][col] === 0); // Get available columns
    const randomColumn = availableColumns[Math.floor(Math.random() * availableColumns.length)];

    // Wait for a brief moment before making the move to simulate thinking time
    setTimeout(async () => {
      await makeMove(randomColumn);
    }, 1000); // 1 second delay for effect
  }, [gameStatus, isPaused, gameType, board]);

  // Modify makeMove to handle both human and computer moves
  const makeMove = useCallback(async (column) => {
    if (gameStatus || isPaused || !gameId) return;

    try {
      const startTime = performance.now();
      const updatedGame = await api.makeMove(gameId, column);
      const endTime = performance.now();
      
      setThinkingTime((endTime - startTime) / 1000);
      setBoard(updatedGame.board_state);
      setCurrentPlayer(updatedGame.current_player);
      
      if (updatedGame.is_finished) {
        setGameStatus(updatedGame.winner ? 
          `Player ${updatedGame.winner} wins!` : 
          'Draw!');
      }
    } catch (error) {
      console.error('Error making move:', error);
    }
  }, [gameId, gameStatus, isPaused]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        setGameStarted(false);
      } else if (e.code === 'Space') {
        setIsPaused(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Simulate computer's move every time the player changes
  useEffect(() => {
    if (gameStatus || isPaused || gameType === 'human-human') return; // Don't simulate if game is over or paused

    // When the current player is computer, make a move automatically
    if (gameType === 'computer-computer' || (gameType === 'human-computer' && currentPlayer !== 1)) {
      simulateComputerMove();
    }
  }, [currentPlayer, gameStatus, isPaused, gameType, simulateComputerMove]);

  if (!gameStarted) {
    return <GameConfig onStartGame={initializeGame} />;
  }

  return (
    <div className="game">
      <Board
        board={board}
        onColumnClick={makeMove}
        gameActive={!gameStatus && !isPaused}
      />
      <GameInfo
        currentPlayer={currentPlayer}
        thinkingTime={thinkingTime}
        gameStatus={gameStatus}
        onPause={() => setIsPaused(!isPaused)}
        isPaused={isPaused}
      />
    </div>
  );
};

export default App;
  