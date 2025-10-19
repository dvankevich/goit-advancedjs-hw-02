'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const iziCommon = {
  message: 'Common message',
  theme: 'dark',
  position: 'topRight',
  titleColor: '#fff',
  titleSize: '16px',
  titleLineHeight: '1.5',
  messageColor: '#fff',
  messageSize: '16px',
  messageLineHeight: '1.5',
  imageWidth: 24,
};

const notifications = {
  success: {
    ...iziCommon,
    title: 'OK',
    color: '#59a10d',
    iconUrl: 'ok-icon.svg',
  },
  error: {
    ...iziCommon,
    title: 'Error',
    color: '#ef4040',
    iconUrl: 'error-icon.svg',
  },
  warning: {
    ...iziCommon,
    title: 'Warning',
    color: '#ffa000',
    iconUrl: 'caution-icon.svg',
  },
};

const button = document.querySelector('button');
const delayInput = document.querySelector('input[name="delay"]');
const stateInputs = document.querySelectorAll('input[name="state"]');
const stateForm = document.querySelector('.form');

let promiseDelay = delayInput.value;

delayInput.addEventListener('change', () => {
  promiseDelay = delayInput.value;
});

const handlePromise = async (state, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay} ms`);
      } else {
        reject(`❌ Rejected promise in ${delay} ms`);
      }
    }, delay);
  });
};

const handleClick = async event => {
  event.preventDefault();

  const selectedState = [...stateInputs].find(input => input.checked)?.value;

  if (selectedState && promiseDelay) {
    stateForm.reset();
    try {
      const result = await handlePromise(selectedState, promiseDelay);
      iziToast.success({ ...notifications.success, message: result.slice(1) });
      //console.log(result);
    } catch (error) {
      iziToast.error({ ...notifications.error, message: error.slice(1) });
      //console.log(error);
    }
    //stateForm.reset();
  } else {
    iziToast.warning({
      ...notifications.warning,
      message: 'Please fill in all fields.',
    });
  }
};

button.addEventListener('click', handleClick);
