// Jest setup file for Enohpelet game tests
// This file runs before each test suite

// Mock Web APIs that aren't available in Jest's jsdom environment
global.AudioContext = jest.fn(() => ({
    createMediaStreamSource: jest.fn(),
    createScriptProcessor: jest.fn(),
    createAnalyser: jest.fn(),
    createGain: jest.fn(),
    destination: {},
    sampleRate: 44100,
    currentTime: 0
}));

global.navigator = {
    ...global.navigator,
    mediaDevices: {
        getUserMedia: jest.fn(() => Promise.resolve({
            getTracks: jest.fn(() => [{ stop: jest.fn() }])
        }))
    }
};

// Mock URL.createObjectURL which is used for audio blob handling
global.URL.createObjectURL = jest.fn(() => 'mock-url');
global.URL.revokeObjectURL = jest.fn();

// Mock HTMLAudioElement
global.HTMLAudioElement = jest.fn(() => ({
    play: jest.fn(() => Promise.resolve()),
    pause: jest.fn(),
    load: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    currentTime: 0,
    duration: 0,
    paused: true
}));
