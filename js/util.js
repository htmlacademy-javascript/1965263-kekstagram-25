const MessageType = {
  SUCCESS: 'success',
  ERROR: 'error',
  LOAD_ERROR: 'loadError'
};
const ALERT_SHOW_TIME = 3000;

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessageElement = successMessageTemplate.cloneNode(true);
const closeSuccessMessageElement = successMessageElement.querySelector('.success__button');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessageElement = errorMessageTemplate.cloneNode(true);
const closeErrorMessageElement = errorMessageElement.querySelector('.error__button');

function checkLine (line, maxLength) {
  return line.length <= maxLength;
}

function getRandom (min, max) {
  [min, max]=[Math.abs(min), Math.abs(max)];
  if (max < min) {[min, max]=[max, min];}
  return Math.round(min + (max - min) * Math.random());
}

function showLoadFailMessage () {
  const alertContainerElement = document.createElement('div');
  alertContainerElement.classList.add('alert__container');
  const alertElement = document.createElement('div');
  alertElement.classList.add('alert__message');
  alertElement.textContent = 'Ошибка загрузки данных';
  alertContainerElement.append(alertElement);
  document.body.append(alertContainerElement);

  setTimeout(() => {
    alertContainerElement.remove();
  }, ALERT_SHOW_TIME);
}

const onCloseSuccessMessageElement = () => {
  successMessageElement.remove();
};

const onCloseErrorMessageElement = () => {
  errorMessageElement.remove();
};

function showMessage (messageType) {
  switch (messageType) {
    case MessageType.SUCCESS:
      document.body.append(successMessageElement);
      closeSuccessMessageElement.addEventListener('click', onCloseSuccessMessageElement);
      break;
    case MessageType.ERROR:
      document.body.append(errorMessageElement);
      closeErrorMessageElement.addEventListener('click', onCloseErrorMessageElement);
      break;
    case MessageType.LOAD_ERROR:
      showLoadFailMessage();
      break;
  }
}

const debounce = (callback, delay) => {
  let timeoutId;
  return function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, arguments), delay);
  };
};

export {getRandom, checkLine, showMessage, MessageType, debounce};
