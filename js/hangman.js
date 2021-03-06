const words = [
    "buffalo",
    "pizza",
    "zebra",
    "excellent",
    "xerox",
    "milkshake",
    "computer",
    "apple",
    "yeti",
    "spaghetti",
    "shark",
    "lobster",
    "giraffe",
    "gorilla",
    "lasagna", 
    "amazon",
    "river",
    "pumpkin",
    "horse",
    "maple",
    "honey",
    "walrus",
    "thunder"
]

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;


function randomWord() {
    answer = words[Math.floor(Math.random() * words.length)].toUpperCase();
}

function generateButtons() {
    let buttonsHTML = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => 
        `
        <button
            class="btn btn-lg btn-primary m-2"
            id='`+ letter +`'
            onClick="handleGuess('`+ letter +`')"
        >
        `+ letter +`
        </button>
        `
    ).join('');

    document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);

    if(answer.indexOf(chosenLetter) >= 0) {
        guessedWord();
        checkIfGameWon();
    } else if(answer.indexOf(chosenLetter) === -1){
        mistakes++;
        updateMistakes();
        checkIfGameLost();
        updateHangmanPic();
    }
}

function updateHangmanPic() {
    document.getElementById('hangmanPic').src = 'images/'+ mistakes + '.png';
}

function guessedWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : ' _ ')).join('');

    document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
    document.getElementById('mistakes').innerHTML = mistakes;
}

function checkIfGameLost() {
    if(mistakes === maxWrong) {
        document.getElementById('wordSpotlight').innerHTML = `<div class="loseAnswer">The correct answer was `+ answer +`</div>`;
        document.getElementById('keyboard').innerHTML = `<div class="loseMsg">Sorry You Lost! Wanna try your luck again?`;
    }
}

function checkIfGameWon() {
    if(wordStatus === answer) {
        document.getElementById('keyboard').innerHTML = `<div class="winMsg">We Got a WINNER!!!  Play again?</div>`
    }
}

function reset() {
    mistakes = 0;
    guessed = [];

    randomWord();
    updateMistakes();
    guessedWord();
    generateButtons();
    updateHangmanPic();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();
