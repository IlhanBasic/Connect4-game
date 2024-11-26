from django.db import models

class Game(models.Model):
    GAME_TYPES = [
        ('human-human', 'Human vs Human'),
        ('human-computer', 'Human vs Computer'),
        ('computer-computer', 'Computer vs Computer'),
    ]
    
    DIFFICULTY_LEVELS = [
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('expert', 'Expert'),
    ]
    
    game_type = models.CharField(max_length=20, choices=GAME_TYPES)
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_LEVELS, null=True, blank=True)
    board_state = models.JSONField(default=list)
    current_player = models.IntegerField(default=1)
    is_finished = models.BooleanField(default=False)
    winner = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Game {self.id} - {self.game_type}"

class GameMove(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='moves')
    column = models.IntegerField()
    player = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"Move {self.id} - Game {self.game_id} - Column {self.column}"   