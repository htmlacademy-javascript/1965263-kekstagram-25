import {showMessage} from './util.js';
import {closeEditForm, submitButtonElement} from './edit-form.js';

function getData (callback) {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((res) => res.json())
    .then((data) => callback(data))
    .catch(() => {
      showMessage('loadError');
    });
}

function sendData (body) {
  fetch('https://25.javascript.pages.academy/kekstagram', {
    method: 'POST',
    body
  })
    .then((res) => {
      if (res.ok) {
        submitButtonElement.disabled = false;
        closeEditForm();
        showMessage('success');
      } else {
        closeEditForm();
        showMessage('error');
      }
    })
    .catch(() => showMessage('error'));
}

export {getData, sendData};
