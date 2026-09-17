let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;

let timer = null;
let running = false;

const hoursDisplay = document.getElementById("hours");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const millisecondsDisplay = document.getElementById("milliseconds");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapList = document.getElementById("lapList");

startBtn.addEventListener("click", function() {
    if (running === false) {
        running = true;
        timer = setInterval(function() {
            milliseconds++;

            if (milliseconds === 100) {
                milliseconds = 0;
                seconds++;
            }

            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }

            if (minutes === 60) {
                minutes = 0;
                hours++;
            }

            updateDisplay();
        }, 10);
    }
});

pauseBtn.addEventListener("click", function() {
    if (running === true) {
        clearInterval(timer);
        running = false;
    }
});

resetBtn.addEventListener("click", function() {
    clearInterval(timer);

    hours = 0;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    running = false;

    updateDisplay();
    lapList.innerHTML = "";
});

lapBtn.addEventListener("click", function() {
    if (running === true) {
        const lapItem = document.createElement("li");
        const lapNumber = lapList.children.length + 1;

        const currentTime =
            formatTime(hours) + ":" +
            formatTime(minutes) + ":" +
            formatTime(seconds) + ":" +
            formatTime(milliseconds);

        lapItem.innerHTML =
            `<span>Lap ${lapNumber}</span>
             <span>${currentTime}</span>`;

        lapList.appendChild(lapItem);
    }
});

function updateDisplay() {
    hoursDisplay.textContent = formatTime(hours);
    minutesDisplay.textContent = formatTime(minutes);
    secondsDisplay.textContent = formatTime(seconds);
    millisecondsDisplay.textContent = formatTime(milliseconds);
}

function formatTime(value) {
    if (value < 10) {
        return "0" + value;
    }

    return value;
}