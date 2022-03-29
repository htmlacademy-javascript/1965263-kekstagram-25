const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = ['Ирина', 'Андрей', 'Артём', 'Елена', 'Михаил', 'Анна', 'Сергей', 'Пётр', 'Ольга', 'Дарья'];

const CommentsIdCount = {
  MIN: 1,
  MAX: 999
};

const CommentsCount = {
  MIN: 1,
  MAX: 15
};

const AvatarUrlCount = {
  MIN: 1,
  MAX: 6
};

const MessagesCount = {
  MIN: 0,
  MAX: 5
};

const NamesCount = {
  MIN: 0,
  MAX: 9
};

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessageElement = successMessageTemplate.cloneNode(true);
const closeSuccessMessageElement = successMessageElement.querySelector('.success__button');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessageElement = errorMessageTemplate.cloneNode(true);
const closeErrorMessageElement = errorMessageElement.querySelector('.error__button');

const checkLine = (line, maxLength) => line.length <= maxLength;

function getRandom (min, max) {
  [min, max]=[Math.abs(min), Math.abs(max)];
  if (max < min) {[min, max]=[max, min];}
  return Math.round(min + (max - min) * Math.random());
}

const commentsId = [];              // массив для хранения уникальных id для комментариев
function getCommentId () {
  let id = getRandom(CommentsIdCount.MIN, CommentsIdCount.MAX);
  while (commentsId.some((item) => item === id)) {
    id = getRandom(CommentsIdCount.MIN, CommentsIdCount.MAX);
  }

  commentsId.push(id);
  return id;
}

function createComments () {
  const comments = [];
  for (let i=0; i<getRandom(CommentsCount.MIN, CommentsCount.MAX); i++) {
    comments.push({
      id: getCommentId(),
      avatar: `img/avatar-${getRandom(AvatarUrlCount.MIN, AvatarUrlCount.MAX)}.svg`,
      message: messages[getRandom(MessagesCount.MIN, MessagesCount.MAX)],
      name: names[getRandom(NamesCount.MIN, NamesCount.MAX)]
    });
  }
  return comments;
}

function showLoadFailMessage () {
  const ALERT_SHOW_TIME = 3000;
  const alertContainerElement = document.createElement('div');
  const alertElement = document.createElement('div');
  alertContainerElement.style.cssText = `display: flex;
                                         position: fixed;
                                         top: 0;
                                         left: 0;
                                         margin: 0;
                                         padding: 0;
                                         width: 100%;
                                         height: 100%;
                                         background-color: rgba(0, 0, 0, 0.5);
                                         z-index: 10;`;
  alertElement.style.cssText = `margin: 0 auto;
                                align-self: center;
                                width: 350px;
                                height: 50px;
                                font-size: 18px;
                                font-weight: 800;
                                line-height: 50px;
                                border-radius: 10px;
                                text-align: center;
                                opacity: 0.7;
                                color: black;
                                background-color: greenyellow;`;
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
    case 'success':
      document.body.append(successMessageElement);
      closeSuccessMessageElement.addEventListener('click', onCloseSuccessMessageElement);
      break;
    case 'error':
      document.body.append(errorMessageElement);
      closeErrorMessageElement.addEventListener('click', onCloseErrorMessageElement);
      break;
    case 'loadError':
      showLoadFailMessage();
      break;
  }
}

export {getRandom, createComments, checkLine, showMessage};
