const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving',
  'fish',
  'direction',
  'feelings',
  'tuptek',
  'regards',
  'disfunction',
  'shaving',
  'sebastian',
  'gin',
  'picture',
  'developer',
  'machine',
  'javascript',
  'eyebrows',
  'html',
  'games',
  'loki',
  'window',
  'wallpaper',
  'shoes',
  'flooring',
  'metal',
  'watch',
  'porous',
  'water',
  'light',
  'transport',
  'forrest'
];

//init word
let randomWord;
//init score
let score = 0;
//init time
let time = 10;
//set difficulty to value in local storage or medium
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

text.focus()

//start counting down

const timeInterval = setInterval(updateTime, 1000)

//generate random word from array
function getRandomWord(){
  return words[Math.floor(Math.random()*words.length)]
}
console.log(getRandomWord())

//update the score

function updateScore(){
  score++
  scoreEl.innerHTML = score
}

//add word to DOM
function addWordToDom(){
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}
addWordToDom();


//update time

function updateTime(){
  time--;
  timeEl.innerHTML = time + 's';

  if (time === 0){
    clearInterval(timeInterval);
    gameOver();
  }
}

//game over
function gameOver(){
  endgameEl.innerHTML = `
  <h1>Time Run Out</h3>
  <p>Your Final Score is ${score}</p>
  <button onclick="location.reload()">Reload</button>
  `
  endgameEl.style.display = 'flex'
}

//add event listener 

text.addEventListener('input', e => {
  const insertedText = e.target.value
  if(insertedText === randomWord){
    updateScore();
    addWordToDom();

    e.target.value = '';

    if(difficulty === 'hard'){
      time += 2
    }else if (difficulty === 'medium'){
      time += 3
    }else{
      time += 4
    }
    updateTime();
  }
})

//settings btn click

settingsBtn.addEventListener('click', () => {
  settings.classList.toggle('hide');
})


//setting select

settingsForm.addEventListener('change', (e) => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty',difficulty);
})
