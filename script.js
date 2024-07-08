let startTime, elapsedTime = 0, timerInterval;
const timeDisplay = document.getElementById('time-display');
const startStopButton = document.getElementById('start-stop');
const pauseButton = document.getElementById('pause');
const lapButton = document.getElementById('lap');
const resetButton = document.getElementById('reset');
const lapsList = document.getElementById('laps-list');

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 1000;
    let ms = Math.floor(diffInMs);

    let formattedHH = hh.toString().padStart(2, '0');
    let formattedMM = mm.toString().padStart(2, '0');
    let formattedSS = ss.toString().padStart(2, '0');
    let formattedMS = ms.toString().padStart(3, '0');

    return `${formattedHH}:${formattedMM}:${formattedSS}.${formattedMS}`;
}

function print(txt) {
    timeDisplay.innerHTML = txt;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 1);
    showButton('PAUSE');
}

function pause() {
    clearInterval(timerInterval);
    showButton('START');
}

function reset() {
    clearInterval(timerInterval);
    print("00:00:00.000");
    elapsedTime = 0;
    lapsList.innerHTML = '';
    showButton('START');
}

function lap() {
    let li = document.createElement('li');
    li.innerText = timeToString(elapsedTime);
    lapsList.appendChild(li);
}

function showButton(buttonKey) {
    if (buttonKey === 'START') {
        startStopButton.style.display = 'inline-block';
        pauseButton.style.display = 'none';
    } else {
        startStopButton.style.display = 'none';
        pauseButton.style.display = 'inline-block';
    }
}

startStopButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

showButton('START');

