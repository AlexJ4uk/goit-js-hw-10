import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";



const startBtn = document.querySelector("button[data-start]");
const secondsEl = document.querySelector("[data-seconds]");
const minutesEl = document.querySelector("[data-minutes]");
const hoursEl = document.querySelector("[data-hours]");
const daysEl = document.querySelector("[data-days]");
const dateTimePicker = document.getElementById("datetime-picker");

let userSelectedDate = null;
startBtn.disabled = true;
dateTimePicker.disabled = false;

const options = {
    enableTime: true,
    time_24hr: true,
    enableSeconds: false,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        
        if (selectedDate <= new Date()) {
            window.alert("Please choose a date in the future");
            startBtn.disabled = true;
            return;
        }
        userSelectedDate = selectedDate;
        startBtn.disabled = false;
    },
};

flatpickr("#datetime-picker", options);

class Timer {
    constructor() {
        this.intervalId = null;
    }
    
    start() {
        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = userSelectedDate - currentTime;
            startBtn.disabled = true;
            dateTimePicker.disabled = true;


            if (deltaTime <= 0) {
                clearInterval(this.intervalId);
                this.updateTimerDisplay(0, 0, 0, 0);
                window.alert("Countdown finished");
                return;
            }
            
            const { days, hours, minutes, seconds } = convertMs(deltaTime);
            this.updateTimerDisplay(days, hours, minutes, seconds);
        }, 1000);
    }

    updateTimerDisplay(days, hours, minutes, seconds) {
        daysEl.textContent = String(days).padStart(2, "0");
        hoursEl.textContent = String(hours).padStart(2, "0");
        minutesEl.textContent = String(minutes).padStart(2, "0");
        secondsEl.textContent = String(seconds).padStart(2, "0");
    }
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  

const time = new Timer();

startBtn.addEventListener("click", time.start.bind(time));