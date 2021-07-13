const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const btnReset = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const btnClicked = document.getElementsByTagName('button');

let missed = 0;

const phrases = [
    'BUDDHA IN YOUR MIRROR',
    'WOMAN ON A MISSION',
    'NEW HUMAN REVOLUTION',
    'THE TEN WORLDS',
    'HOPE IS A DECISION'
];

// listen for the start game button to be clicked
btnReset.addEventListener('click', () => {
    overlay.style.display = 'none';
});

// return a random phrase from an array
function getRandomPhraseAsArray(arr) {
    const randomPhrase = arr[Math.floor(Math.random() * arr.length)]
    return randomPhrase.split('');
}

// adds the letters of a string to the display
function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {
        let ul = document.querySelector('ul');
        let listItem = document.createElement('li');
        ul.appendChild(listItem);
        listItem.textContent = arr[i];
        if (arr[i] !== ' ') {
            listItem.className = 'letter';
        } else {
            listItem.className = 'space';
        }
    } 
};

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

// check if a letter is in the phrase
function checkLetter(btnClicked) {
    const letters = document.querySelectorAll('li');
    let match = null;
    for (let i = 0; i < letters.length; i++) {
        if (btnClicked === letters[i].textContent) {
            letters[i].classList.add('show');
            match = true;
        }
    };
    return match;
};

// add a mouseover on the keyboard letters
qwerty.addEventListener('mouseover', function(event) {
    event.target.style.color = 'tomato';
    setTimeout (function() {
        event.target.style.color = '';
    }, 700);
}, false);

// listen for the onscreen keyboard to be clicked
qwerty.addEventListener('click',  (event) => {
    if (event.target.tagName === 'BUTTON') {
            event.target.className = 'chosen';
            event.target.disabled = true;
            const letterFound = checkLetter(event.target.textContent);

// check if letter is incorrect and lose heart
     if (!letterFound) {
            const heart = document.querySelector(".tries img[src='images/liveHeart.png']")
            heart.setAttribute('src', 'images/lostHeart.png')
            missed +=1;
        }
        checkWin();
    }
  });

// Check if win or lose game
function checkWin() {
    const letter = document.querySelectorAll('.letter');
    const show = document.querySelectorAll('.show');
    const title = document.querySelector('.title');
    if (letter.length === show.length) {
        overlay.classList.add('win');
        title.textContent = "WINNER!";
        overlay.style.display = 'flex';
        btnReset.textContent = 'Reset';
        
    } else if (missed >= 5) {
        overlay.classList.add('lose');
        title.textContent = "LOST!";
        overlay.style.display = 'flex';
        btnReset.textContent = 'Reset';
    }
    reset();
};

function reset() {
btnReset.addEventListener('click', () => {
    window.location.reload();
    });
} ;
 


