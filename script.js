const btnStartStop = document.querySelector("#start");
const btnBreak = document.querySelector("#break");
const btnPomodoro = document.querySelector("#pomodoro");
const btnReset = document.querySelector("#reset");
const timer = document.querySelector("#pomodoro-time");

let time = 1500;
let timerId = null;
let mode = "pomodoro";

function format(n) {
    if (n < 10) {
        return `0${n}`;
    } else {
        return n;
    }
}

function editTimeText() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timer.textContent = `${format(minutes)}:${format(seconds)}`;
}

function returnOfInitialDate() {
    clearInterval(timerId);
    btnStartStop.textContent = 'start';

    if (mode === "pomodoro") {
        time = 1500;
        editTimeText();
        btnBreak.classList.remove('active');
        btnPomodoro.classList.add('active');
    } else {
        time = 300;
        editTimeText();
        btnPomodoro.classList.remove('active');
        btnBreak.classList.add('active');
    }
}

btnStartStop.addEventListener('click', function() {
    if (btnStartStop.textContent === 'start') {
        btnStartStop.textContent = 'stop';

        timerId = setInterval(() => {
            editTimeText();

            if (time <= 0) {
                returnOfInitialDate();
            }

            time--;

        }, 10);

    } else {
        btnStartStop.textContent = 'start';
        clearInterval(timerId);
    };
})

btnBreak.addEventListener('click', function() {
    mode = "pause";
    returnOfInitialDate();
})

btnPomodoro.addEventListener('click', function() {
    mode = "pomodoro";
    returnOfInitialDate();
})

btnReset.addEventListener('click', function() {
    returnOfInitialDate();
})