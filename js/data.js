import {getRandom} from './util.js';
import {createComments} from './util.js';

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

const LikesCount = {
  MIN: 15,
  MAX: 200
};

const POSTS_NUMBER = 25;

const fakeServerResponse = () => Array.from({length: POSTS_NUMBER}, (item, index) => ({
  id: index,
  url: `photos/${index+1}.jpg`,
  description: descriptions[index],
  likes: getRandom(LikesCount.MIN, LikesCount.MAX),
  comments: createComments()
}));

export {fakeServerResponse};
