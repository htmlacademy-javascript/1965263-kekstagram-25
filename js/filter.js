import {thumbnailsContainerElement} from './gallery.js';
import {getRandom, debounce} from './util.js';
import {renderThumbnails} from './render-thumbnails.js';

const filtersContainerElement = document.querySelector('.img-filters');
const RERENDER_DELAY = 500;
const RandomPictures = {
  MIN_ID: 0,
  MAX_ID: 24,
  MAX_COUNT: 10
};

function applyFilterOption(pickedElementsSet) {
  const thumbnailElements = thumbnailsContainerElement.querySelectorAll('.picture');
  thumbnailElements.forEach((item) => thumbnailsContainerElement.removeChild(item));
  renderThumbnails(pickedElementsSet);
}

const filterOption = debounce(applyFilterOption, RERENDER_DELAY);

function filterPictures(evt, data) {
  const filterOptionElements = filtersContainerElement.querySelectorAll('.img-filters__button');
  const discussedPictureElements = data.slice().sort((nextItem, currentItem) => currentItem.comments.length - nextItem.comments.length);
  const randomPictureElements = data.slice().sort((a) => a.id - getRandom(RandomPictures.MIN_ID, RandomPictures.MAX_ID)).slice(RandomPictures.MIN_ID, RandomPictures.MAX_COUNT);
  const target = evt.target.closest('.img-filters__button');
  const targetId = target.id;

  filterOptionElements.forEach((item) => item.classList.remove('img-filters__button--active'));
  target.classList.add('img-filters__button--active');

  switch (targetId) {
    case 'filter-random':
      filterOption(randomPictureElements);
      break;
    case 'filter-discussed':
      filterOption(discussedPictureElements);
      break;
    default:
      filterOption(data);
      break;
  }
}

export {filterPictures, filtersContainerElement};
