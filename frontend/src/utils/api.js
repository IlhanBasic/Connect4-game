const API_URL = 'http://localhost:8000/api';

export default {
  createGame: async (gameConfig) => {
    // Ensure that the gameConfig includes the required "game_type"
    if (!gameConfig.game_type) {
      throw new Error('game_type is required');
    }

    const response = await fetch(`${API_URL}/games/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gameConfig),
    });

    if (!response.ok) {
      throw new Error('Failed to create game');
    }

    const data = await response.json();
    return data;
  },

  makeMove: async (gameId, column) => {
    const response = await fetch(`${API_URL}/games/${gameId}/make_move/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ column }),
    });

    if (!response.ok) {
      throw new Error('Failed to make move');
    }

    const data = await response.json();
    return data;
  },

  getGame: async (gameId) => {
    const response = await fetch(`${API_URL}/games/${gameId}/`);

    if (!response.ok) {
      throw new Error('Failed to fetch game');
    }

    const data = await response.json();
    return data;
  }
};
  