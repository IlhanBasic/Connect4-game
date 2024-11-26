
# Pyveži4 - Connect4 Game Simulation

**Pyveži4** is a graphical simulation of the sequential game *Connect4*, written in Python. Players take turns dropping colored tokens into a grid of six rows and seven columns, occupying the lowest available space in the chosen column. The objective is to be the first player to form a horizontal, vertical, or diagonal line of four of their own tokens.

## Features

- **Game Modes:**
  - Human vs Human
  - Human vs AI (with configurable difficulty)
  - AI vs AI (with step-by-step mode or full strategy execution)

- **Customizable Start State:**
  - Load a sequence of pre-played moves from a file.

- **AI Difficulty Levels:**
  - EASY, MEDIUM, and EXPERT AI using Minimax with different depths.

- **Game Algorithms:**
  - Minimax Algorithm with Alpha-Beta Pruning
  - Negascout Algorithm
  - Custom Competitive AI Agent (optional)

- **Real-time Game Monitoring:**
  - Display game state and time spent by the AI on each move.
  
- **File Output:**
  - Record the sequence of moves into a file after each game.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/IlhanBasic/Pyveži4.git
   cd Pyveži4
2. Install the required dependencies:
	```bash
	 pip install -r requirements.txt
3. Run the game:
	```bash
	python main.py
## Game Modes and Configurations

### Starting the Game

Before the game starts, you can choose:

-   Who plays (Human vs Human, Human vs Computer, or Computer vs Computer)
-   Load a game state from a file (if you want to continue from a specific point)
-   Choose the AI's difficulty level

### AI Behavior

The AI can play against itself with two modes:

-   **Step-by-Step** mode to observe the algorithm's decision process.
-   **Full Strategy** mode for an uninterrupted game.

### Minimax and Heuristic Levels

The game supports different levels of AI difficulty:

-   **EASY**: Shallow tree search with simple heuristics.
-   **MEDIUM**: Moderate tree search depth with more sophisticated evaluation.
-   **EXPERT**: Deep tree search and complex heuristic evaluation for challenging gameplay.

## Algorithms Implemented

-   **MinimaxABAgent**: Implements the Minimax algorithm with alpha-beta pruning for two rational players.
-   **Negascout**: A variation of Minimax with scout search for optimizing the evaluation.
-   **CompetitiveAgent**: Customizable agent for competitive gameplay.
## Example File Format for Game State:

A game state can be loaded from a file with the following format:
0
3
0
4
Each number represents a column where a token was placed.

## Usage

-   Use the **ESC** key to exit the game.
-   Press the **SPACE** key to pause or resume the game.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
```css
	This `README.md` now contains complete instructions, game configuration options, how to install and run the application, and details about the algorithms used for the AI.
