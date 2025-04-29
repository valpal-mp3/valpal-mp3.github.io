const boxes = document.querySelectorAll('.input-box');
const timeDisplay = document.getElementById('timeLeft');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');

let validInputs;
let timeLeft;
let timer;
let scrambleInterval;
let cursorInterval;
let gameOver = false;

function startGame() {
    // Resets game variables
    clearInterval(timer);
    clearInterval(scrambleInterval);
    clearInterval(cursorInterval);

    timeLeft = 30;

    validInputs = Array(boxes.length).fill(false);
    gameOver = false;
    timeDisplay.textContent = timeLeft;
    message.textContent = "";

    boxes.forEach(box => {
    box.value = "";
    box.disabled = false;
    box.classList.remove('error');
});

// Countdown
    timer = setInterval(() => {
    if (timeLeft > 0) {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
    } 
    else {
        clearInterval(timer);
        clearInterval(scrambleInterval);
        clearInterval(cursorInterval);
        endGame();
    }
    }, 1000);

    scrambleInterval = setInterval(scrambleDigits, 1000);
    cursorInterval = setInterval(moveCursor, 1000);
}

function scrambleDigits() {
    if (gameOver) 
        return;

    let randomIndex = Math.floor(Math.random() * boxes.length);
    if (!validInputs[randomIndex]) {
        boxes[randomIndex].value = Math.floor(Math.random() * 10);
    }
}

function moveCursor() {
    if (gameOver) 
        return;

    let randomIndex = Math.floor(Math.random() * boxes.length);
    boxes[randomIndex].focus();
}

function endGame() {
    gameOver = true;
    message.textContent = "Time's up!";
    boxes.forEach(box => box.disabled = true);
}

function handleInput(event) {
    if (gameOver) 
        return;

    const box = event.target;
    const index = Array.from(boxes).indexOf(box);
    const digit = box.value;

    if (digit !== '') {
        validInputs[index] = true;
        box.disabled = true;
    }

    if (!digit.match(/\d/)) {
        box.classList.add('error');
    } 
    else {
        box.classList.remove('error');
    }

    setTimeout(() => {
        if (!gameOver) moveCursor();
    }, 50);
}

boxes.forEach(box => box.addEventListener('input', handleInput));
restartBtn.addEventListener('click', startGame);

startGame();