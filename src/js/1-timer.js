'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
//import 'flatpickr/dist/themes/light.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = 0;

const startButton = document.querySelector('button');
const inputField = document.querySelector('input');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const dateNow = Date.now();
    userSelectedDate = selectedDates[0];
    if (userSelectedDate.getTime() < dateNow) {
      //window.alert('Please choose a date in the future');
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
        titleColor: '#fff',
        titleSize: '16px',
        titleLineHeight: '1.5',
        messageColor: '#fff',
        messageSize: '16px',
        messageLineHeight: '1.5',
        backgroundColor: '#ef4040',
        theme: 'light',
        iconUrl: 'izi-icon.svg', // зображення має бути у папці public
        imageWidth: 24,
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

const fp = flatpickr('input#datetime-picker', options);

const interval = {
  days: '03',
  hours: '09',
  minutes: '01',
  seconds: '04',
};

function updateTimerInterface(interval) {
  // Get the element with the "data-*" attributes
  const daysElement = document.querySelector('.timer .field .value[data-days]');
  const hoursElement = document.querySelector(
    '.timer .field .value[data-hours]'
  );
  const minutesElement = document.querySelector(
    '.timer .field .value[data-minutes]'
  );
  const secondsElement = document.querySelector(
    '.timer .field .value[data-seconds]'
  );

  // set interface elements
  daysElement.innerText = interval.days;
  hoursElement.innerText = interval.hours;
  minutesElement.innerText = interval.minutes;
  secondsElement.innerText = interval.seconds;
}

function convertUnixTimeToTime(milliseconds) {
  // ToDo use padStart function https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
  function addZero(s) {
    if (s.length === 1) {
      s = '0' + s;
    }
    return s;
  }
  // Отримання кількості днів, годин, хвилин та секунд
  const days = Math.floor(milliseconds / (24 * 60 * 60 * 1000)).toString();
  const hours = Math.floor(
    (milliseconds % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
  ).toString();
  const minutes = Math.floor(
    (milliseconds % (60 * 60 * 1000)) / (60 * 1000)
  ).toString();
  const seconds = Math.floor((milliseconds % (60 * 1000)) / 1000).toString();

  // Повернення результату у вигляді об'єкта
  return {
    days: addZero(days),
    hours: addZero(hours),
    minutes: addZero(minutes),
    seconds: addZero(seconds),
  };
}

startButton.addEventListener('click', () => {
  //console.log('Button click handler');
  startButton.disabled = true;
  inputField.disabled = true;

  // create interval
  const intervalId = setInterval(() => {
    const timeToGo = userSelectedDate - Date.now();
    //console.log(timeToGo);
    if (userSelectedDate - Date.now() > 0) {
      updateTimerInterface(convertUnixTimeToTime(timeToGo));
    } else {
      startButton.disabled = false;
      inputField.disabled = false;
      clearInterval(intervalId);
    }
  }, 1000);
});

// Deactivate button
startButton.disabled = true;
inputField.disabled = false;
