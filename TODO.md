---
applyTo: 'TODO.md'
---

THIS FILE IS WRITTEN FOR INGESTION BY AN LLM. ALL EDITS SHOULD MAINTAIN THIS FORMAT.

SUMMARY:
This project is a web-based game called "Enohpelet," which is "Telephone" spelled backward. The game is a variation of the classic "Telephone" game, but with a twist: each audio recording is played in reverse for the next player to interpret and re-record. The core audio functionality (recording, stopping, reversing, and playing) is already implemented. The current focus is on building the turn-based game logic. The file below outlines the current task, the backlog of features, and what has been completed.

# Enohpelet Game TODO

## Current Task
- Implement a turn-based system.

## Backlog
- Keep track of the current round and turn number.
- Store the history of audio recordings for a round.
- Add a "Next Turn" or "Pass to Next Player" button.
- Add a "Start New Game" button to reset the state.
- Display the current turn number (e.g., "Player 3's Turn").
- Create a visual list or history of the recordings in the current round.
- At the end of a game, allow players to listen to all the recordings in order to see how the audio has changed.
- Add a "Reveal" or "End Game" button to trigger the final playback sequence.
- Improve instructions and user feedback (e.g., "Recording...", "Now record what you heard").
- Player names associated with each turn.
- Save game state to `localStorage` to allow resuming a game.
- Shareable results at the end of a game.
- Online multiplayer functionality.

## Completed Features
- Record audio from the user's microphone.
- Stop the recording.
- Reverse the recorded audio snippet.
- Play the reversed audio snippet.
