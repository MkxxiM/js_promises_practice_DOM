'use strict';

const promise1 = new Promise((resolve, reject) => {
  const msg = document.createElement('div');

  msg.dataset.qa = 'notification';

  document.addEventListener('click', () => {
    resolve(msg);
  });

  setTimeout(() => {
    document.removeEventListener('click', function () {});
    reject(msg);
  }, 3000);
});

promise1.then(
  function (msg) {
    msg.classList.add('success');
    msg.textContent = 'Promise was resolved!';
    document.body.appendChild(msg);
  },
  function (msg) {
    msg.classList.add('error');
    msg.textContent = 'Promise was rejected!';
    document.body.appendChild(msg);
  },
);

const secondPromise = () =>
  new Promise((resolve) => {
    const msg = document.createElement('div');

    msg.dataset.qa = 'notification';

    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });

    document.addEventListener('auxclick', (e) => {
      if (e.button === 2) {
        resolve(msg);
      }
    });

    document.addEventListener('click', () => {
      resolve(msg);
    });
  });

const promise2 = promise1.then(secondPromise);

promise2.then((msg) => {
  msg.dataset.qa = 'notification';
  msg.classList.add('success');
  msg.textContent = 'Second promise was resolved!';
  document.body.appendChild(msg);
});

const promise3 = promise2.then(() => {
  return new Promise((resolve) => {
    const msg = document.createElement('div');

    msg.dataset.qa = 'notification';

    resolve(msg);
  });
});

promise3.then((msg) => {
  msg.dataset.qa = 'notification';
  msg.classList.add('success');
  msg.textContent = 'Third promise was resolved';
  document.body.appendChild(msg);
});
