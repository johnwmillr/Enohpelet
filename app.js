const recordButton = document.getElementById('recordButton');
const stopButton = document.getElementById('stopButton');
const playButton = document.getElementById('playButton');
const playForwardButton = document.getElementById('playForwardButton');
const audioPlayer = document.getElementById('audioPlayer');

let mediaRecorder;
let audioChunks = [];
let reversedAudioBlob;
let forwardAudioBlob;
let audioStream = null;

recordButton.addEventListener('click', async () => {
    if (!audioStream) {
        try {
            audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        } catch (error) {
            console.error('Error accessing microphone:', error);
            // Optionally, display an error message to the user
            return;
        }
    }
    mediaRecorder = new MediaRecorder(audioStream);
    mediaRecorder.start();

    recordButton.classList.add('recording');
    recordButton.textContent = 'Recording...';
    stopButton.disabled = false;
    playButton.disabled = true;
    playForwardButton.disabled = true;
    audioPlayer.src = '';

    mediaRecorder.addEventListener('dataavailable', event => {
        audioChunks.push(event.data);
    });
});

stopButton.addEventListener('click', () => {
    mediaRecorder.stop();
    recordButton.classList.remove('recording');
    recordButton.textContent = 'Record';
    stopButton.disabled = true;

    mediaRecorder.addEventListener('stop', async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        forwardAudioBlob = audioBlob;
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
        reversedAudioBlob = new Blob([wav], { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(reversedAudioBlob);
        audioPlayer.src = audioUrl;
        playButton.disabled = false;
        playForwardButton.disabled = false;
    });
});

playButton.addEventListener('click', () => {
    const audioUrl = URL.createObjectURL(reversedAudioBlob);
    audioPlayer.src = audioUrl;
    audioPlayer.play();
});

playForwardButton.addEventListener('click', () => {
    const audioUrl = URL.createObjectURL(forwardAudioBlob);
    audioPlayer.src = audioUrl;
    audioPlayer.play();
});


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
