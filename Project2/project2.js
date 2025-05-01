const boxes = document.querySelectorAll('.input-box');
const timeDisplay = document.getElementById('timeLeft');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');
const submitBtn = document.getElementById('submitBtn');

let validInputs;
let timeLeft;
let timer;
let scrambleInterval;
let cursorInterval;
let gameOver = false;
const maxLength = 1;

function startGame() {
    clearInterval(timer);
    clearInterval(scrambleInterval);
    clearInterval(cursorInterval);

    timeLeft = 30;
    validInputs = Array(boxes.length).fill(false);
    gameOver = false;

    timeDisplay.textContent = timeLeft;
    message.textContent = "";

    boxes.forEach(box => {
        box.textContent = "";
        box.classList.remove('error');
        box.contentEditable = true;
    });

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
        boxes[randomIndex].textContent = Math.floor(Math.random() * 10);
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
    boxes.forEach(box => box.contentEditable = false);
}

function handleInput(event) {
    if (gameOver) 
        return;

    const box = event.target;
    const index = Array.from(boxes).indexOf(box);
    let digit = box.textContent.trim();

    if (digit.length > maxLength) {
        box.textContent = digit.slice(0, maxLength);
        digit = box.textContent;
    }

    if (digit.match(/^\d$/)) {
        validInputs[index] = true;
        box.classList.remove('error');
    } 
    else {
        validInputs[index] = false;
        box.classList.add('error');
    }

    checkCompletion();
}

function checkCompletion() {
    if (validInputs.every(v => v)) {
        clearInterval(timer);
        clearInterval(scrambleInterval);
        clearInterval(cursorInterval);
        message.textContent = "Success! Phone number entered.";
        gameOver = true;
    }
}

submitBtn.addEventListener('click', () => {
    if (gameOver) 
        return;

    let phoneNumber = "";
    let valid = true;

    boxes.forEach((box, i) => {
        const value = box.textContent.trim();
        if (!value.match(/^\d$/)) {
            box.classList.add('error');
            valid = false;
        } 
        else {
            box.classList.remove('error');
            phoneNumber += value;
        }
    });

    if (valid) {
        clearInterval(timer);
        clearInterval(scrambleInterval);
        clearInterval(cursorInterval);
        gameOver = true;
        message.textContent = `Submitted! Phone number: ${formatPhoneNumber(phoneNumber)}`;
        boxes.forEach(box => box.contentEditable = false);
    } 
    else {
        message.textContent = "Please correct the highlighted inputs.";
    }
});

function formatPhoneNumber(num) {
    return `${num.slice(0, 3)}-${num.slice(3, 6)}-${num.slice(6)}`;
}

boxes.forEach(box => {
    box.addEventListener('input', handleInput);
    box.addEventListener('keypress', (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    });
});

restartBtn.addEventListener('click', startGame);

startGame();
document.body.classList.add('loaded');
