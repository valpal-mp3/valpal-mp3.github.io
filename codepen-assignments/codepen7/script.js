const state = {
	selectedChords: [],
	isPlaying: false,
	playInterval: null,
	bpm: 120
};

let audioContext;
const chordNotes = {
	I: [293.66, 329.63, 392.0], // C major (C-E-G)
	ii: [263.66, 349.23, 435.0], // D minor (D-F-A)
	iii: [360.63, 392.0, 457.63], // E minor (E-G-B)
	IV: [353.23, 440.0, 559,35], // F major (F-A-C)
	V: [325.0, 400.49, 536,46], // G major (G-B-D)
	vi: [440.0, 538.36, 659.25], // A minor (A-C-E)
	"vii°": [490.88, 567.33, 649.46] // B diminished (B-D-F)
};

const moodDescriptions = {
	"I-IV-V-I": "Classic and resolving",
	"ii-V-I": "Jazz standard",
	"I-vi-IV-V": "50s progression",
	"i-iv-v": "Natural minor progression",
	"I-V-vi-IV": "Pop progression"
};

function initAudio() {
	audioContext = new (window.AudioContext || window.webkitAudioContext)();
}

function playChord(frequencies) {
	const gainNode = audioContext.createGain();
	gainNode.gain.value = 0.1;
	gainNode.connect(audioContext.destination);

	frequencies.forEach((freq) => {
		const oscillator = audioContext.createOscillator();
		oscillator.type = "sine";
		oscillator.frequency.value = freq;
		oscillator.connect(gainNode);
		oscillator.start();

		gainNode.gain.exponentialRampToValueAtTime(
			0.001,
			audioContext.currentTime + 0.5
		);
		oscillator.stop(audioContext.currentTime + 0.5);
	});
}

const progressionDisplay = document.getElementById("progressionDisplay");
const moodDescription = document.getElementById("moodDescription");
const playBtn = document.getElementById("playBtn");
const resetBtn = document.getElementById("resetBtn");
const bpmRange = document.getElementById("bpmRange");
const bpmValue = document.getElementById("bpmValue");
const chordBtns = document.querySelectorAll(".chord-btn");

function updateDisplay() {
	if (state.selectedChords.length === 0) {
		progressionDisplay.innerHTML =
			'<span class="empty-message">Select up to 4 chords to build your progression</span>';
		moodDescription.textContent = "";
		playBtn.disabled = true;
		return;
	}

	progressionDisplay.innerHTML = state.selectedChords
		.map(
			(chord, index) =>
				`<div class="chord-box" data-index="${index}">${chord}</div>`
		)
		.join("");

	const progression = state.selectedChords.join("-");
	moodDescription.textContent =
		moodDescriptions[progression] || "Custom progression";
	playBtn.disabled = false;

	document.querySelectorAll(".chord-box").forEach((box) => {
		box.addEventListener("click", handleChordBoxClick);
	});
}

function handleChordBoxClick(e) {
	if (state.isPlaying) return;

	const index = parseInt(e.target.dataset.index);
	state.selectedChords.splice(index, 1);

	chordBtns.forEach((btn) => {
		btn.disabled = state.selectedChords.length >= 4;
	});

	updateDisplay();
}

function handleChordClick(e) {
	if (!e.target.matches(".chord-btn") || state.selectedChords.length >= 4)
		return;

	const chord = e.target.dataset.chord;
	state.selectedChords.push(chord);

	if (!audioContext) initAudio();
	playChord(chordNotes[chord]);

	if (state.selectedChords.length >= 4) {
		chordBtns.forEach((btn) => (btn.disabled = true));
	}

	updateDisplay();
}

function updateBPM(newBpm) {
	state.bpm = newBpm;
	bpmValue.textContent = newBpm;

	if (state.isPlaying) {
		clearInterval(state.playInterval);
		startProgression();
	}
}

function startProgression() {
	let currentIndex = 0;
	const intervalTime = (60 / state.bpm) * 1000;

	const chordBoxes = document.querySelectorAll(".chord-box");

	state.playInterval = setInterval(() => {
		chordBoxes.forEach((box) => box.classList.remove("playing"));
		chordBoxes[currentIndex].classList.add("playing");

		const currentChord = state.selectedChords[currentIndex];
		playChord(chordNotes[currentChord]);

		currentIndex = (currentIndex + 1) % state.selectedChords.length;
	}, intervalTime);
}

async function playProgression() {
	if (state.isPlaying) {
		clearInterval(state.playInterval);
		state.isPlaying = false;
		playBtn.textContent = "▶ Play";
		document
			.querySelectorAll(".chord-box")
			.forEach((box) => box.classList.remove("playing"));
		return;
	}

	if (!audioContext) initAudio();

	state.isPlaying = true;
	playBtn.textContent = "⏸ Pause";

	startProgression();
}

function reset() {
	state.selectedChords = [];
	state.isPlaying = false;
	clearInterval(state.playInterval);
	playBtn.textContent = "▶ Play";
	chordBtns.forEach((btn) => (btn.disabled = false));
	updateDisplay();
}

document.querySelectorAll(".chord-buttons").forEach((section) => {
	section.addEventListener("click", handleChordClick);
});
playBtn.addEventListener("click", playProgression);
resetBtn.addEventListener("click", reset);
bpmRange.addEventListener("input", (e) => updateBPM(parseInt(e.target.value)));

updateDisplay();