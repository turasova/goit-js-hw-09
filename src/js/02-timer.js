import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const selectors = {
    input: document.querySelector('#datetime-picker'),
    button: document.querySelector('button[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]')
};


let intervalId = null;
let selectedDate = null;
selectors.button.disabled = true;



flatpickr("#datetime-picker", {

  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      selectors.button.disabled = true;
      selectors.input.disabled = false;
      Notiflix.Notify.failure('Sorry, please select a date in the future(((');
    } else {

       selectors.button.disabled = false;
       selectors.input.disabled = true;
      Notiflix.Notify.success('The date is entered correctly, click the "Start" button!!!');
    }
  
   
  }
  });

    selectors.button.addEventListener('click', handlerClick);

    function handlerClick() {
        timerStart.start();
      };
const timerStart = {
  start() {
    intervalId = setInterval(() => {
      let currentDate = Date.now();
      const differenceTime = selectedDate - currentDate;
      changeTimer(convertMs(differenceTime));
      selectors.button.disabled = true;
      selectors.input.disabled = true;
      
      if (differenceTime <= 1000) {
        timerStart.stop();

      }
    }, 1000);
  },
  stop() {
    selectors.button.disabled = true;
    selectors.input.disabled = false;
    clearInterval(intervalId);
    return
  },
};

function changeTimer({ days, hours, minutes, seconds }) {
  selectors.days.textContent = `${days}`;
  selectors.hours.textContent = `${hours}`;
  selectors.minutes.textContent = `${minutes}`;
  selectors.seconds.textContent = `${seconds}`;
};

  function addZero(value) {
    return String(value).padStart(2, '0');
};


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addZero(Math.floor(ms / day));
  const hours = addZero(Math.floor((ms % day) / hour));
  const minutes = addZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

 




