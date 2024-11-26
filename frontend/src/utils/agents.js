// AI Agents implementation
export class MinimaxABAgent {
    constructor(depth) {
      this.depth = depth;
      this.preferredOrder = [3, 2, 4, 1, 5, 0, 6]; // Column preference order
    }
  
    evaluate(board, player) {
      const opponent = player === 1 ? 2 : 1;
      const playerWinSpots = this.countPotentialWins(board, player);
      const opponentWinSpots = this.countPotentialWins(board, opponent);
      return playerWinSpots - opponentWinSpots;
    }
  
    countPotentialWins(board, player) {
      let count = 0;
      // Horizontal checks
      for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 4; col++) {
          if (this.checkLine(board, row, col, 0, 1, player)) count++;
        }
      }
      // Vertical checks
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 7; col++) {
          if (this.checkLine(board, row, col, 1, 0, player)) count++;
        }
      }
      // Diagonal checks
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 4; col++) {
          if (this.checkLine(board, row, col, 1, 1, player)) count++;
          if (this.checkLine(board, row + 3, col, -1, 1, player)) count++;
        }
      }
      return count;
    }
  
    checkLine(board, row, col, deltaRow, deltaCol, player) {
      let empty = 0;
      let playerCount = 0;
      
      for (let i = 0; i < 4; i++) {
        const r = row + i * deltaRow;
        const c = col + i * deltaCol;
        const cell = board[r][c];
        
        if (cell === 0) empty++;
        else if (cell === player) playerCount++;
        else return false;
      }
      
      return empty + playerCount === 4;
    }
  
    minimax(board, depth, alpha, beta, maximizingPlayer, player) {
      if (depth === 0) {
        return this.evaluate(board, player);
      }
  
      const validMoves = this.getValidMoves(board);
      if (validMoves.length === 0) {
        return this.evaluate(board, player);
      }
  
      if (maximizingPlayer) {
        let maxEval = -Infinity;
        for (const col of this.preferredOrder) {
          if (validMoves.includes(col)) {
            const newBoard = this.makeMove(board, col, player);
            const evalScore = this.minimax(newBoard, depth - 1, alpha, beta, false, player);
            maxEval = Math.max(maxEval, evalScore);
            alpha = Math.max(alpha, evalScore);
            if (beta <= alpha) break;
          }
        }
        return maxEval;
      } else {
        let minEval = Infinity;
        const opponent = player === 1 ? 2 : 1;
        for (const col of this.preferredOrder) {
          if (validMoves.includes(col)) {
            const newBoard = this.makeMove(board, col, opponent);
            const evalScore = this.minimax(newBoard, depth - 1, alpha, beta, true, player);
            minEval = Math.min(minEval, evalScore);
            beta = Math.min(beta, evalScore);
            if (beta <= alpha) break;
          }
        }
        return minEval;
      }
    }
  
    getValidMoves(board) {
      const moves = [];
      for (let col = 0; col < 7; col++) {
        if (board[0][col] === 0) {
          moves.push(col);
        }
      }
      return moves;
    }
  
    makeMove(board, col, player) {
      const newBoard = board.map(row => [...row]);
      for (let row = 5; row >= 0; row--) {
        if (newBoard[row][col] === 0) {
          newBoard[row][col] = player;
          break;
        }
      }
      return newBoard;
    }
  
    getBestMove(board, player) {
      let bestScore = -Infinity;
      let bestMove = this.preferredOrder[0];
      
      const validMoves = this.getValidMoves(board);
      
      for (const col of this.preferredOrder) {
        if (validMoves.includes(col)) {
          const newBoard = this.makeMove(board, col, player);
          const score = this.minimax(newBoard, this.depth - 1, -Infinity, Infinity, false, player);
          if (score > bestScore) {
            bestScore = score;
            bestMove = col;
          }
        }
      }
      
      return bestMove;
    }
  }
  
  export class NegascoutAgent extends MinimaxABAgent {
    negascout(board, depth, alpha, beta, player) {
      if (depth === 0) {
        return this.evaluate(board, player);
      }
  
      const validMoves = this.getValidMoves(board);
      if (validMoves.length === 0) {
        return this.evaluate(board, player);
      }
  
      let firstChild = true;
      let score = -Infinity;
      const opponent = player === 1 ? 2 : 1;
  
      for (const col of this.preferredOrder) {
        if (validMoves.includes(col)) {
          const newBoard = this.makeMove(board, col, player);
          
          if (firstChild) {
            score = -this.negascout(newBoard, depth - 1, -beta, -alpha, opponent);
            firstChild = false;
          } else {
            score = -this.negascout(newBoard, depth - 1, -alpha - 1, -alpha, opponent);
            if (alpha < score && score < beta) {
              score = -this.negascout(newBoard, depth - 1, -beta, -score, opponent);
            }
          }
  
          alpha = Math.max(alpha, score);
          if (alpha >= beta) break;
        }
      }
      
      return alpha;
    }
  
    getBestMove(board, player) {
      let bestScore = -Infinity;
      let bestMove = this.preferredOrder[0];
      
      const validMoves = this.getValidMoves(board);
      
      for (const col of this.preferredOrder) {
        if (validMoves.includes(col)) {
          const newBoard = this.makeMove(board, col, player);
          const score = -this.negascout(newBoard, this.depth - 1, -Infinity, Infinity, player === 1 ? 2 : 1);
          if (score > bestScore) {
            bestScore = score;
            bestMove = col;
          }
        }
      }
      
      return bestMove;
    }
  }