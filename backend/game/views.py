from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Game, GameMove
from .serializers import GameSerializer, GameMoveSerializer
from .agents import MinimaxABAgent, NegascoutAgent
import numpy as np

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # Initialize empty board
            board = [[0 for _ in range(7)] for _ in range(6)]
            serializer.validated_data['board_state'] = board
            game = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def make_move(self, request, pk=None):
        game = self.get_object()
        if game.is_finished:
            return Response({"error": "Game is already finished"}, 
                          status=status.HTTP_400_BAD_REQUEST)

        column = request.data.get('column')
        if not self.is_valid_move(game.board_state, column):
            return Response({"error": "Invalid move"}, 
                          status=status.HTTP_400_BAD_REQUEST)

        # Make player move
        self.apply_move(game, column)
        
        # If playing against computer, make computer move
        if game.game_type == 'human-computer' and not game.is_finished:
            agent = self.get_computer_agent(game.difficulty)
            computer_move = agent.get_chosen_column(game.board_state)
            self.apply_move(game, computer_move)

        serializer = self.get_serializer(game)
        return Response(serializer.data)

    def get_computer_agent(self, difficulty):
        depth = {'easy': 2, 'medium': 4, 'expert': 6}[difficulty]
        return NegascoutAgent(depth) if difficulty == 'expert' else MinimaxABAgent(depth)

    def is_valid_move(self, board, column):
        if column < 0 or column >= 7:
            return False
        return board[0][column] == 0

    def apply_move(self, game, column):
        board = game.board_state
        for row in range(5, -1, -1):
            if board[row][column] == 0:
                board[row][column] = game.current_player
                break

        game.board_state = board
        
        # Check for win or draw
        if self.check_win(board, game.current_player):
            game.is_finished = True
            game.winner = game.current_player
        elif self.is_board_full(board):
            game.is_finished = True
        else:
            game.current_player = 3 - game.current_player  # Switch between 1 and 2

        game.save()
        
        # Record the move
        GameMove.objects.create(
            game=game,
            column=column,
            player=game.current_player
        )

    def check_win(self, board, player):
        # Check horizontal
        for row in range(6):
            for col in range(4):
                if all(board[row][col + i] == player for i in range(4)):
                    return True

        # Check vertical
        for row in range(3):
            for col in range(7):
                if all(board[row + i][col] == player for i in range(4)):
                    return True

        # Check diagonal (positive slope)
        for row in range(3):
            for col in range(4):
                if all(board[row + i][col + i] == player for i in range(4)):
                    return True

        # Check diagonal (negative slope)
        for row in range(3, 6):
            for col in range(4):
                if all(board[row - i][col + i] == player for i in range(4)):
                    return True

        return False

    def is_board_full(self, board):
        return all(cell != 0 for row in board for cell in row)