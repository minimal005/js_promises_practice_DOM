'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((res) => createMessage(res, 'success'))
  .catch((err) => createMessage(err, 'error'));

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    resolve('Second promise was resolved');
  });
});

secondPromise.then((res) => createMessage(res, 'success'));

const leftClick = new Promise((resolve) => {
  document.addEventListener('click', () => resolve('success'));
});

const rightClick = new Promise((resolve) => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('success');
  });
});

const thirdPromise = Promise.all([leftClick, rightClick]);

thirdPromise.then(() => createMessage('Third promise was resolved', 'success'));

function createMessage(text, classMessage) {
  const message = document.createElement('div');

  message.classList.add(classMessage);
  message.setAttribute('data-qa', 'notification');
  message.textContent = text;

  document.body.append(message);
}
