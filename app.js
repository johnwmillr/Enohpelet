const recordButton = document.getElementById('recordButton');
const stopButton = document.getElementById('stopButton');
const listenButton = document.getElementById('listenButton');
const playbackButton = document.getElementById('playbackButton');
const audioPlayer = document.getElementById('audioPlayer');
const startGameButton = document.getElementById('startGameButton');
const nextTurnButton = document.getElementById('nextTurnButton');
const turnDisplay = document.getElementById('turnDisplay');
const historyList = document.getElementById('history');
const historyContainer = document.getElementById('history-container');
const gameContainer = document.getElementById('game-container');
const endGameButton = document.getElementById('endGameButton');
const recordWarning = document.getElementById('recordWarning');
const instructionDisplay = document.getElementById('instructionDisplay');
const instructionText = document.getElementById('instructionText');
const titleLink = document.getElementById('titleLink');

let mediaRecorder;
let audioChunks = [];
let currentRecording = {
    forward: null,
    reversed: null
};
let audioStream = null;

let gameInProgress = false;
let currentTurn = 0;
let audioHistory = [];
let currentlyPlayingButton = null;
let hasRecordedThisTurn = false;
let microphoneAccessGranted = false; // Track if we've already gotten permission this session

async function ensureMicrophoneAccess() {
    // If we already confirmed access this session and have an active stream, reuse it
    if (microphoneAccessGranted && audioStream && audioStream.active) {
        console.log('Using existing microphone access');
        return true;
    }

    // Check if we already have permission using the Permissions API
    if ('permissions' in navigator) {
        try {
            const permission = await navigator.permissions.query({ name: 'microphone' });
            console.log('Permission state:', permission.state);

            if (permission.state === 'granted') {
                // We already have permission, just get the stream
                try {
                    audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                    microphoneAccessGranted = true;
                    console.log('Got microphone access without prompt');
                    return true;
                } catch (error) {
                    console.error('Error getting media stream despite granted permission:', error);
                    // Fall through to request permission again
                }
            } else if (permission.state === 'denied') {
                alert('Microphone access has been denied. Please enable it in your browser settings and refresh the page.');
                return false;
            }
            // If state is 'prompt', we'll fall through to request permission
        } catch (error) {
            console.log('Permissions API query failed (this is normal in some browsers):', error.message);
            // Fall through to regular getUserMedia approach
        }
    } else {
        console.log('Permissions API not supported');
    }

    // Either no Permissions API support, permission is 'prompt', or we need to request permission
    try {
        console.log('Requesting microphone access...');
        audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        microphoneAccessGranted = true; // Remember that we got permission this session
        console.log('Microphone access granted');
        return true;
    } catch (error) {
        console.error('Error accessing microphone:', error);
        if (error.name === 'NotAllowedError') {
            alert('Microphone access was denied. Please allow access and try again.');
        } else if (error.name === 'NotFoundError') {
            alert('No microphone found. Please connect a microphone and try again.');
        } else {
            alert('Error accessing microphone. Please check your browser settings and try again.');
        }
        return false;
    }
}

function updateInstructions(message, highlight = false) {
    instructionText.textContent = message;
    if (highlight) {
        instructionDisplay.classList.add('highlight');
        setTimeout(() => {
            instructionDisplay.classList.remove('highlight');
        }, 2000);
    } else {
        instructionDisplay.classList.remove('highlight');
    }
}

function updateControlsForTurn() {
    turnDisplay.textContent = `Player ${currentTurn}'s Turn`;

    recordButton.disabled = false;
    stopButton.disabled = true;
    listenButton.disabled = true;
    playbackButton.disabled = true;
    nextTurnButton.disabled = true;
    audioPlayer.src = '';
    hasRecordedThisTurn = false;
    recordWarning.style.display = 'none';

    if (currentTurn === 1) {
        listenButton.style.display = 'none';
        updateInstructions("You're the first player! Record yourself saying a word or phrase to start the game.", true);
    } else {
        listenButton.style.display = 'inline-block';
        const lastRecording = audioHistory[audioHistory.length - 1];
        if (lastRecording && lastRecording.reversed) {
            const reversedAudioUrl = URL.createObjectURL(lastRecording.reversed);
            audioPlayer.src = reversedAudioUrl;
            listenButton.disabled = false; // Enable listening to previous turn's audio
            updateInstructions("First, listen to the previous player's recording, then try to repeat what you heard!", true);
        }
    }
    endGameButton.style.display = audioHistory.length > 0 ? 'inline-block' : 'none';
}

startGameButton.addEventListener('click', async () => {
    const hasAccess = await ensureMicrophoneAccess();
    if (!hasAccess) {
        return;
    }

    gameInProgress = true;
    currentTurn = 1;
    audioHistory = [];

    historyList.innerHTML = '';
    historyContainer.style.display = 'none';
    startGameButton.style.display = 'none';
    gameContainer.style.display = 'block';
    endGameButton.style.display = 'none';
    endGameButton.disabled = false;

    updateControlsForTurn();
    updateInstructions("Welcome to Enohpelet! Each recording will be played in reverse for the next player.", true);
});

function resetToHomePage() {
    // Stop any ongoing recording
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
    }

    // Stop any playing audio
    audioPlayer.pause();
    audioPlayer.src = '';

    // Reset all game state
    gameInProgress = false;
    currentTurn = 0;
    audioHistory = [];
    currentRecording = { forward: null, reversed: null };
    hasRecordedThisTurn = false;
    currentlyPlayingButton = null;

    // Reset UI to initial state
    gameContainer.style.display = 'none';
    startGameButton.style.display = 'inline-block';
    historyContainer.style.display = 'none';
    historyList.innerHTML = '';
    recordWarning.style.display = 'none';

    // Reset button states
    recordButton.disabled = false;
    stopButton.disabled = true;
    listenButton.disabled = true;
    playbackButton.disabled = true;
    nextTurnButton.disabled = true;
    endGameButton.disabled = false;

    // Reset button appearance
    recordButton.classList.remove('recording');
    recordButton.querySelector('span').textContent = 'Record';
    if (currentlyPlayingButton) {
        currentlyPlayingButton.classList.remove('playing');
        currentlyPlayingButton.style.removeProperty('--playback-duration');
    }

    // Reset instructions
    updateInstructions("Click \"Start New Game\" to begin playing!", false);
    turnDisplay.textContent = '';
}

titleLink.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the default link behavior
    resetToHomePage();
});

// Record button hover warning functionality
recordButton.addEventListener('mouseenter', () => {
    if (hasRecordedThisTurn && !recordButton.disabled) {
        recordWarning.style.display = 'block';
    }
});

recordButton.addEventListener('mouseleave', () => {
    recordWarning.style.display = 'none';
});

recordButton.addEventListener('click', () => {
    if (!gameInProgress) return;

    mediaRecorder = new MediaRecorder(audioStream);
    mediaRecorder.start();

    recordButton.disabled = true;
    recordButton.classList.add('recording');
    recordButton.querySelector('span').textContent = 'Recording...';
    stopButton.disabled = false;
    listenButton.disabled = true;
    playbackButton.disabled = true;
    nextTurnButton.disabled = true;
    audioPlayer.src = '';

    updateInstructions("🎤 Recording... Speak clearly and press Stop when finished!", false);

    mediaRecorder.addEventListener('dataavailable', event => {
        audioChunks.push(event.data);
    });
});

stopButton.addEventListener('click', () => {
    mediaRecorder.stop();
    recordButton.classList.remove('recording');
    recordButton.querySelector('span').textContent = 'Record';
    stopButton.disabled = true;
    recordButton.disabled = false; // Re-enable so they can record again (overwrite)
    nextTurnButton.disabled = false;
    playbackButton.disabled = false;
    hasRecordedThisTurn = true;

    updateInstructions("Great! You can now play back your recording or pass to the next player.", false);

    mediaRecorder.addEventListener('stop', async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        currentRecording.forward = audioBlob;
        audioChunks = [];

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const arrayBuffer = await audioBlob.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        // Reverse the audio
        const reversedBuffer = audioContext.createBuffer(
            audioBuffer.numberOfChannels,
            audioBuffer.length,
            audioBuffer.sampleRate
        );

        for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
            const channelData = audioBuffer.getChannelData(i);
            const reversedChannelData = reversedBuffer.getChannelData(i);
            for (let j = 0; j < channelData.length; j++) {
                reversedChannelData[j] = channelData[channelData.length - 1 - j];
            }
        }

        // Convert the reversed buffer back to a Blob
        const wav = audioBufferToWav(reversedBuffer);
        currentRecording.reversed = new Blob([wav], { type: 'audio/wav' });

        audioHistory.push(currentRecording);
        // updateHistory(); - We will call this at the end of the game

        const audioUrl = URL.createObjectURL(currentRecording.forward);
        audioPlayer.src = audioUrl;
    });
});

nextTurnButton.addEventListener('click', () => {
    currentTurn++;
    currentRecording = { forward: null, reversed: null };
    updateControlsForTurn();
});

listenButton.addEventListener('click', () => {
    // The audio source is already set in updateControlsForTurn, so we just play.
    audioPlayer.play();
    currentlyPlayingButton = listenButton;
    updateInstructions("🎧 Playing the previous player's recording (reversed)... Now try to say what you heard!", false);
});

playbackButton.addEventListener('click', () => {
    // This plays the original recording for the CURRENT turn, after it's been recorded.
    if (currentRecording.forward) {
        const audioUrl = URL.createObjectURL(currentRecording.forward);
        audioPlayer.src = audioUrl;
        audioPlayer.play();
        currentlyPlayingButton = playbackButton;
        updateInstructions("🎵 Playing back your recording... Happy with it? Pass to the next player!", false);
    }
});

endGameButton.addEventListener('click', () => {
    gameInProgress = false;
    recordButton.disabled = true;
    stopButton.disabled = true;
    listenButton.disabled = true;
    playbackButton.disabled = true;
    nextTurnButton.disabled = true;
    endGameButton.disabled = true;
    turnDisplay.textContent = 'Game Over';
    startGameButton.style.display = 'inline-block';
    // gameContainer.style.display = 'none'; - Keep game container for history

    updateInstructions("🎉 Game finished! Listen to all recordings below to hear how the message evolved!", true);

    updateHistory();
    historyContainer.style.display = 'block';


    // Restore the original onended behavior in case it was changed
    audioPlayer.onended = () => {
        if (currentlyPlayingButton) {
            currentlyPlayingButton.classList.remove('playing');
            currentlyPlayingButton.style.removeProperty('--playback-duration');
            currentlyPlayingButton = null;
        }
    };
});

audioPlayer.addEventListener('play', () => {
    if (currentlyPlayingButton) {
        const duration = audioPlayer.duration;
        currentlyPlayingButton.style.setProperty('--playback-duration', `${duration}s`);
        currentlyPlayingButton.classList.add('playing');
    }
});

audioPlayer.addEventListener('ended', () => {
    if (currentlyPlayingButton) {
        currentlyPlayingButton.classList.remove('playing');
        currentlyPlayingButton.style.removeProperty('--playback-duration');
        currentlyPlayingButton = null;
    }
});

function updateHistory() {
    historyList.innerHTML = '';
    audioHistory.forEach((record, index) => {
        const historyItem = document.createElement('div');
        historyItem.classList.add('history-item');
        historyItem.innerHTML = `
            <p>Turn ${index + 1}</p>
            <div class="play-buttons">
                <button class="play-history-button" data-index="${index}" data-type="forward">Play</button>
                <button class="play-history-button" data-index="${index}" data-type="reversed">Play Reversed</button>
            </div>
        `;
        historyList.appendChild(historyItem);
    });

    document.querySelectorAll('.play-history-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            const type = e.target.dataset.type;
            const audioUrl = URL.createObjectURL(audioHistory[index][type]);
            audioPlayer.src = audioUrl;
            audioPlayer.play();
            currentlyPlayingButton = e.target;
        });
    });
}

// Helper function to convert AudioBuffer to a WAV file (Blob)
// This is necessary because you can't directly play back a raw AudioBuffer.
function audioBufferToWav(buffer) {
    let numOfChan = buffer.numberOfChannels,
        length = buffer.length * numOfChan * 2 + 44,
        bufferArr = new ArrayBuffer(length),
        view = new DataView(bufferArr),
        channels = [],
        i,
        sample,
        offset = 0,
        pos = 0;

    // write WAVE header
    setUint32(0x46464952); // "RIFF"
    setUint32(length - 8); // file length - 8
    setUint32(0x45564157); // "WAVE"

    setUint32(0x20746d66); // "fmt " chunk
    setUint32(16); // length = 16
    setUint16(1); // PCM (uncompressed)
    setUint16(numOfChan);
    setUint32(buffer.sampleRate);
    setUint32(buffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
    setUint16(numOfChan * 2); // block-align
    setUint16(16); // 16-bit

    setUint32(0x61746164); // "data" - chunk
    setUint32(length - pos - 4); // chunk length

    // write interleaved data
    for (i = 0; i < buffer.numberOfChannels; i++)
        channels.push(buffer.getChannelData(i));

    while (pos < length) {
        for (i = 0; i < numOfChan; i++) {
            // interleave channels
            sample = Math.max(-1, Math.min(1, channels[i][offset])); // clamp
            sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0; // scale to 16-bit signed int
            view.setInt16(pos, sample, true); // write 16-bit sample
            pos += 2;
        }
        offset++; // next source sample
    }

    return bufferArr;

    function setUint16(data) {
        view.setUint16(pos, data, true);
        pos += 2;
    }

    function setUint32(data) {
        view.setUint32(pos, data, true);
        pos += 4;
    }
}
