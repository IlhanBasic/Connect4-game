from rest_framework import serializers
from .models import Game, GameMove

class GameMoveSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameMove
        fields = ['id', 'column', 'player', 'created_at']

class GameSerializer(serializers.ModelSerializer):
    moves = GameMoveSerializer(many=True, read_only=True)
    
    class Meta:
        model = Game
        fields = ['id', 'game_type', 'difficulty', 'board_state', 'current_player', 
                 'is_finished', 'winner', 'created_at', 'updated_at', 'moves']