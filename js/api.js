import {showMessage} from './util.js';
import {closeEditForm, submitButtonElement} from './edit-form.js';

function getData (fn) {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((res) => res.json())
    .then((data) => fn(data));
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
        showMessage('Данные успешно отправлены', 'greenyellow');
        console.log(res);
      } else {
        closeEditForm();
        showMessage('Ошибка отправки данных', 'red');
      }
    })
    .catch(() => showMessage('Ошибка отправки данных', 'red'));
}

export {getData, sendData};
