'use strict';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
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

const iziSuccess = {
  ...iziCommon,
  title: 'OK',
  color: '#59a10d',
  iconUrl: 'ok-icon.svg', // зображення має бути у папці public
};

const iziError = {
  ...iziCommon,
  title: 'Error',
  color: '#ef4040',
  iconUrl: 'error-icon.svg', // зображення має бути у папці public
};

const iziWarning = {
  ...iziCommon,
  title: 'Warning',
  color: '#ffa000',
  iconUrl: 'caution-icon.svg',
};

const button = document.querySelector('button');
const delay = document.querySelector('input[name="delay"]');
let promiceDelay = delay.value;

delay.addEventListener('change', () => {
  promiceDelay = delay.value;
  //console.log(promiceDelay);
});

// ToDo: можна і без stateInputs. До інпутів можна добратись і через
// stateForm.
// Певно, через деякий час, я буду сам над собою сміятись. :)
const stateInputs = document.querySelectorAll('input[name="state"]');
const stateForm = document.querySelector('.form');
//console.log(stateForm);

const handleClick = event => {
  event.preventDefault();
  //console.log(stateForm);
  let promiceState = '';
  stateInputs.forEach(input => {
    if (input.checked) {
      promiceState = input.value;
    }
  });
  //console.log(promiceState, promiceDelay);
  if (promiceState && promiceDelay) {
    // console.log(`${promiceState} in delay: ${promiceDelay}`);

    // Create promise
    const promise = new Promise((resolve, reject) => {
      //console.log('new Promice');
      const savedPromiceDelay = promiceDelay;
      setTimeout(() => {
        if (promiceState === 'fulfilled') {
          resolve(`✅ Fulfilled promise in ${savedPromiceDelay} ms`);
        } else {
          reject(`❌ Rejected promise in ${savedPromiceDelay} ms`);
        }
      }, promiceDelay);
    });
    // Registering promise callbacks
    promise.then(
      value => {
        iziToast.success({
          ...iziSuccess,
          message: `${value.slice(1)}`,
        });
        console.log(value); // "Success! Value passed to resolve function"
      },
      error => {
        iziToast.error({
          ...iziError,
          message: `${error.slice(1)}`,
        });
        console.log(error); // "Error! Error passed to reject function"
      }
    );
    // reset form values
    stateForm.reset();
  } else {
    iziToast.warning({
      ...iziWarning,
      message: 'Please fill in all fields.',
    });
    // window.alert('Please fill in all fields.');
  }
};

//button.addEventListener('submit', handleClick);
button.addEventListener('click', handleClick);
