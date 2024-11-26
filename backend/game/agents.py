from .models import Game
import random
import time

class MinimaxABAgent:
    def __init__(self, depth=4):
        self.depth = depth
        self.preferred_order = [3, 2, 4, 1, 5, 0, 6]

    def get_chosen_column(self, board):
        valid_moves = [col for col in range(7) if board[0][col] == 0]
        if not valid_moves:
            return None
            
        best_score = float('-inf')
        best_move = valid_moves[0]
        
        for col in valid_moves:
            temp_board = [row[:] for row in board]
            self._make_move(temp_board, col, 2)  # Computer is player 2
            score = self._minimax(temp_board, self.depth - 1, float('-inf'), float('inf'), False)
            
            if score > best_score:
                best_score = score
                best_move = col
                
        return best_move

    def _minimax(self, board, depth, alpha, beta, maximizing):
        if depth == 0 or self._is_terminal(board):
            return self._evaluate(board)
            
        valid_moves = [col for col in range(7) if board[0][col] == 0]
        
        if maximizing:
            max_eval = float('-inf')
            for col in valid_moves:
                temp_board = [row[:] for row in board]
                self._make_move(temp_board, col, 2)
                eval = self._minimax(temp_board, depth - 1, alpha, beta, False)
                max_eval = max(max_eval, eval)
                alpha = max(alpha, eval)
                if beta <= alpha:
                    break
            return max_eval
        else:
            min_eval = float('inf')
            for col in valid_moves:
                temp_board = [row[:] for row in board]
                self._make_move(temp_board, col, 1)
                eval = self._minimax(temp_board, depth - 1, alpha, beta, True)
                min_eval = min(min_eval, eval)
                beta = min(beta, eval)
                if beta <= alpha:
                    break
            return min_eval

    def _make_move(self, board, col, player):
        for row in range(5, -1, -1):
            if board[row][col] == 0:
                board[row][col] = player
                return row
        return -1

    def _is_terminal(self, board):
        # Check for win
        for player in [1, 2]:
            # Horizontal
            for row in range(6):
                for col in range(4):
                    if all(board[row][col + i] == player for i in range(4)):
                        return True
            
            # Vertical
            for row in range(3):
                for col in range(7):
                    if all(board[row + i][col] == player for i in range(4)):
                        return True
            
            # Diagonal
            for row in range(3):
                for col in range(4):
                    if all(board[row + i][col + i] == player for i in range(4)):
                        return True
                    if all(board[row + i][col + 3 - i] == player for i in range(4)):
                        return True
        
        # Check for draw
        return all(cell != 0 for row in board for cell in row)

    def _evaluate(self, board):
        score = 0
        
        # Evaluate horizontal windows
        for row in range(6):
            for col in range(4):
                window = [board[row][col + i] for i in range(4)]
                score += self._evaluate_window(window)
        
        # Evaluate vertical windows
        for row in range(3):
            for col in range(7):
                window = [board[row + i][col] for i in range(4)]
                score += self._evaluate_window(window)
        
        # Evaluate diagonal windows
        for row in range(3):
            for col in range(4):
                window = [board[row + i][col + i] for i in range(4)]
                score += self._evaluate_window(window)
                window = [board[row + i][col + 3 - i] for i in range(4)]
                score += self._evaluate_window(window)
        
        return score

    def _evaluate_window(self, window):
        score = 0
        player_pieces = window.count(2)
        empty_pieces = window.count(0)
        opponent_pieces = window.count(1)
        
        if player_pieces == 4:
            score += 100
        elif player_pieces == 3 and empty_pieces == 1:
            score += 5
        elif player_pieces == 2 and empty_pieces == 2:
            score += 2
        
        if opponent_pieces == 3 and empty_pieces == 1:
            score -= 4
            
        return score

class NegascoutAgent(MinimaxABAgent):
    def get_chosen_column(self, board):
        valid_moves = [col for col in range(7) if board[0][col] == 0]
        if not valid_moves:
            return None
            
        best_score = float('-inf')
        best_move = valid_moves[0]
        
        for col in valid_moves:
            temp_board = [row[:] for row in board]
            self._make_move(temp_board, col, 2)
            score = -self._negascout(temp_board, self.depth - 1, float('-inf'), float('inf'), 1)
            
            if score > best_score:
                best_score = score
                best_move = col
                
        return best_move

    def _negascout(self, board, depth, alpha, beta, player):
        if depth == 0 or self._is_terminal(board):
            return self._evaluate(board) * (1 if player == 2 else -1)
            
        valid_moves = [col for col in range(7) if board[0][col] == 0]
        if not valid_moves:
            return 0
            
        max_score = float('-inf')
        next_player = 3 - player  # Switch between 1 and 2
        
        for i, col in enumerate(valid_moves):
            temp_board = [row[:] for row in board]
            self._make_move(temp_board, col, player)
            
            if i == 0:
                score = -self._negascout(temp_board, depth - 1, -beta, -alpha, next_player)
            else:
                score = -self._negascout(temp_board, depth - 1, -alpha - 1, -alpha, next_player)
                if alpha < score < beta:
                    score = -self._negascout(temp_board, depth - 1, -beta, -score, next_player)
            
            max_score = max(max_score, score)
            alpha = max(alpha, score)
            if alpha >= beta:
                break
                
        return max_score    