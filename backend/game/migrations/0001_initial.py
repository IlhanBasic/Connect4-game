# Generated by Django 5.1.2 on 2024-11-26 16:49

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('game_type', models.CharField(choices=[('human-human', 'Human vs Human'), ('human-computer', 'Human vs Computer'), ('computer-computer', 'Computer vs Computer')], max_length=20)),
                ('difficulty', models.CharField(blank=True, choices=[('easy', 'Easy'), ('medium', 'Medium'), ('expert', 'Expert')], max_length=10, null=True)),
                ('board_state', models.JSONField(default=list)),
                ('current_player', models.IntegerField(default=1)),
                ('is_finished', models.BooleanField(default=False)),
                ('winner', models.IntegerField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='GameMove',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('column', models.IntegerField()),
                ('player', models.IntegerField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('game', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='moves', to='game.game')),
            ],
            options={
                'ordering': ['created_at'],
            },
        ),
    ]