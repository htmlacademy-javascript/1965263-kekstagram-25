function getRandom (min, max) {
  if (max < 0 || min < 0) {
    return;
  }

  if (max < min) {[min, max]=[max, min];}
  return Math.round(min + (max - min) * Math.random());
}

const checkLine = (line, maxLength) => line.length <= maxLength;

getRandom(112, 12);
checkLine('Hello, world!', 100);

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = ['Ирина', 'Андрей', 'Артём', 'Елена', 'Михаил', 'Анна', 'Сергей', 'Пётр', 'Ольга', 'Дарья'];

const descriptions = [
  'На пляже нашего отеля',
  'По дороге на море',
  'Где-то на островах',
  'Местный лайфгард:)',
  'Весёлый завтрак',
  'Взяли напрокат сегодня',
  'На диете',
  'Клюквенный морс, неожиданно...',
  'Он улетел, но обещал вернуться',
  'Прогулок на сегодня достаточно',
  'Огороды местных',
  'Наш новый транспорт',
  'Замечательный обед',
  'Дополнение к заказу',
  'Тапки из новой коллекции',
  'Где-то в небе над горами',
  'Выступление местного кружка хорового пения',
  'Классика бессмертна',
  'Ночные тапки',
  'Наш отель вечером',
  'Тайский плов',
  'На закате',
  'Неожиданный гость',
  'На концерте',
  'Едем на рыбалку'
];

const commentsId = [];              // массив для хранения уникальных id для комментариев
function getCommentId () {
  let id = getRandom(1, 999);
  while (commentsId.some((item) => item === id)) {
    id = getRandom(1, 999);
  }

  commentsId.push(id);
  return id;
}

function createComments () {
  const comments = [];
  for (let i=0; i<getRandom(1, 15); i++) {
    comments.push({
      id: getCommentId(),
      avatar: `img/avatar-${getRandom(1, 6)}.svg`,
      message: messages[getRandom(0, 5)],
      name: names[getRandom(0, 9)]
    });
  }
  return comments;
}

const fakeServerResponse = () => Array.from({length: 25}, (item, index) => ({
  id: index+1,
  url: `photos/${index+1}.jpg`,
  description: descriptions[index],
  likes: getRandom(15, 200),
  comments: createComments()
}));

fakeServerResponse();
