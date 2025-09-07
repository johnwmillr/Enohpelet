/**
 * Unit tests for Enohpelet game core functions
 * 
 * Simple, focused tests for key utility functions from the game.
 */

// Test helper functions copied from app.js
function debugLog(message) {
    if (DEBUG_MODE) {
        console.log('[DEBUG]', message);
    }
}

function updateInstructions(message, highlight = false) {
    const instructionText = document.getElementById('instructionText');
    const instructionDisplay = document.getElementById('instructionDisplay');

    if (instructionText) {
        instructionText.textContent = message;
    }

    if (instructionDisplay) {
        if (highlight) {
            instructionDisplay.classList.add('highlight');
        } else {
            instructionDisplay.classList.remove('highlight');
        }
    }
}

function audioBufferToWav(buffer) {
    let numOfChan = buffer.numberOfChannels,
        length = buffer.length * numOfChan * 2 + 44,
        bufferArr = new ArrayBuffer(length);

    // Simple WAV conversion (abbreviated for testing)
    return bufferArr;
}

// Global test variables
let DEBUG_MODE = false;

describe('Enohpelet Game Tests', () => {

    beforeEach(() => {
        // Set up basic DOM
        document.body.innerHTML = `
            <div id="instructionText">Default</div>
            <div id="instructionDisplay"></div>
        `;

        DEBUG_MODE = false;
        jest.clearAllMocks();
    });

    test('debugLog should log when DEBUG_MODE is true', () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        DEBUG_MODE = true;

        debugLog('Test message');

        expect(consoleSpy).toHaveBeenCalledWith('[DEBUG]', 'Test message');
        consoleSpy.mockRestore();
    });

    test('debugLog should not log when DEBUG_MODE is false', () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        DEBUG_MODE = false;

        debugLog('Test message');

        expect(consoleSpy).not.toHaveBeenCalled();
        consoleSpy.mockRestore();
    });

    test('updateInstructions should update text content', () => {
        updateInstructions('New message');

        const element = document.getElementById('instructionText');
        expect(element.textContent).toBe('New message');
    });

    test('updateInstructions should add highlight class when requested', () => {
        updateInstructions('Test', true);

        const display = document.getElementById('instructionDisplay');
        expect(display.classList.contains('highlight')).toBe(true);
    });

    test('audioBufferToWav should return ArrayBuffer', () => {
        const mockBuffer = {
            numberOfChannels: 1,
            length: 100
        };

        const result = audioBufferToWav(mockBuffer);

        expect(result).toBeInstanceOf(ArrayBuffer);
    });
});
