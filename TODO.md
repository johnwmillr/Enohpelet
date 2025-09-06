---
applyTo: 'TODO.md'
---

THIS FILE IS WRITTEN FOR INGESTION BY AN LLM. ALL EDITS SHOULD MAINTAIN THIS FORMAT.

SUMMARY:
This project is a web-based game called "Enohpelet," which is "Telephone" spelled backward. The game is a variation of the classic "Telephone" game, but with a twist: each audio recording is played in reverse for the next player to interpret and re-record. The file below outlines the current task, the backlog of features, and what has been completed.

# Enohpelet Game TODO

## Current Task
- [No current task - previous task completed]

## Backlog
- Online multiplayer functionality.
- Player names associated with each turn.
- Save game state to `localStorage` to allow resuming a game.
- Shareable results at the end of a game.
- Automatically trim silence off the front of somebody's new recording

## Completed Features
- Record button now toggles to Stop button while recording (eliminating separate Stop button)
- Deploy app to GitHub Pages with HTTPS - Live at https://www.johnwmillr.com/Enohpelet/
- Hide End Game button after clicking it to prevent confusion
- Optimized microphone usage - only request permission once on "Start New Game", and only stream from microphone during actual recording (when Record button is pressed until Stop is pressed).
- Only ask for microphone permissions the first time a user visits the site. The browser should remember and know that the user has previously given microphone permissions.
- Improve instructions and user feedback (e.g., "Recording...", "Now record what you heard").
- Add a hover warning box saying they'll overwrite their previous recording when the user mouses over "Record" if they've already recorded a snippet on their turn.
- Overhaul the UI and UX to be a beautiful, modern, engaging, responsive, fun web app. Be bold. Use colors and animations.
- At the end of a game, allow players to listen to all the recordings in order to see how the audio has changed.
- Add a "Reveal" or "End Game" button to trigger the final playback sequence.
- Record audio from the user's microphone.
- Stop the recording.
- Reverse the recorded audio snippet.
- Play the reversed audio snippet.
- Make the user only have to give microphone permissions once.
- Play the original audio snippet.
- Turn the recording button red while we're recording.
- Implement a turn-based system.
- Keep track of the current round and turn number.
- Store the history of audio recordings for a round.
- Add a "Next Turn" or "Pass to Next Player" button.
- Add a "Start New Game" button to reset the state.
- Display the current turn number (e.g., "Player 3's Turn").
- Create a visual list or history of the recordings in the current round.
