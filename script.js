const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
let time = 0;
let score = 0;

startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    screens[0].classList.add('up');
})

timeList.addEventListener('click', e => {
    if (e.target.classList.contains('time-btn')) {
        time = parseInt(e.target.getAttribute('data-time'));
        startGame();
    }
})

board.addEventListener('click', e => {
    if (e.target.classList.contains('circle')) {
        score++;
        e.target.remove();
        createRandomCircle();
    }
})

function startGame() {
    screens[1].classList.add('up');
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if (time === 0) finishGame();
    else setTime(--time);
}

function setTime(sec, min = 0) {
    if (sec >= 60) {
        min = Math.floor(sec / 60);
        sec = sec % 60;
    }

    sec < 10 ? sec = `0${sec}` : null;
    min < 10 ? min = `0${min}` : null;
    
    timeEl.innerHTML = `${min}:${sec}`;
}

function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Ваш счёт: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    circle.classList.add('circle');
    circle.style.background = getRandomColor();

    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min));
}

function getRandomColor() {
    const alphabet = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += alphabet[Math.floor(Math.random() * alphabet.length)]
    }
    return color;
}