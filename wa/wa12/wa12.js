const btn = document.querySelector(".new-quote");
const answerBtn = document.querySelector(".twitter");
const jokeAPIEndPt = "https://official-joke-api.appspot.com/jokes/programming/random";
let current = {joke: "", answer: null};

const colors = [
    'darkorchid', 'crimson', 'teal', 'tomato', 'mediumslateblue', 'gold', 'darkturquoise', 'seagreen', 'slateblue'
];

function changeBackgroundColor() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.querySelector('.app').style.backgroundColor = randomColor;
}

btn.addEventListener("click", getJoke);
answerBtn.addEventListener("click", () => displayAnswer(current));

function displayJoke(joke) {
    const jokeText = document.querySelector("#js-quote-text");
    jokeText.textContent = joke.joke;
    const laughSound = document.querySelector("#laugh-sound");
    if(laughSound) {
        laughSound.currentTime = 0;
        laughSound.play();
    }
}

function displayAnswer(joke) {
    const answerText = document.querySelector("#js-answer-text");
    if(joke.answer) {
        answerText.textContent = joke.answer;
    } 
    else {
        answerText.textContent = '';
    }
}

getJoke();
async function getJoke() {
    try {
        const response = await fetch(jokeAPIEndPt);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const json = await response.json();
        const jokeData = json[0];
        current.joke = jokeData.setup;
        current.answer = jokeData.punchline;
        answerBtn.style.display = "block";
        document.querySelector("#js-answer-text").textContent = '';
        displayJoke(current);

        changeBackgroundColor();
    } 
    catch(err) {
        console.error(err);
        alert("Fail");
    }
}
