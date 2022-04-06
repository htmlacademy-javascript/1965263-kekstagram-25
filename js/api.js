import {showMessage, MessageType} from './util.js';
import {closeEditForm, submitButtonElement} from './edit-form.js';

const URL = 'https://25.javascript.pages.academy/kekstagram';

function getData (callback) {
  fetch(`${URL}/data`)
    .then((res) => res.json())
    .then((data) => callback(data))
    .catch(() => {
      showMessage(MessageType.LOAD_ERROR);
    });
}

function sendData (body) {
  fetch(URL, {
    method: 'POST',
    body
  })
    .finally(() => closeEditForm())
    .then((res) => {
      if (res.ok) {
        submitButtonElement.setAttribute('disabled', false);
        showMessage(MessageType.SUCCESS);
      } else {
        showMessage(MessageType.ERROR);
      }
    })
    .catch(() => showMessage(MessageType.ERROR));
}

export {getData, sendData};
