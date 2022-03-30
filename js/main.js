import {thumbnailsContainerElement} from './gallery.js';
import './edit-form.js';
import {getData} from './api.js';
import {renderThumbnails} from './render-thumbnails.js';
import {filtersContainerElement} from './filter.js';
import {getRandom} from './util.js';

function filterPictures(evt, data) {
  const filterOptionElements = filtersContainerElement.querySelectorAll('.img-filters__button');
  const thumbnailElements = thumbnailsContainerElement.querySelectorAll('.picture');
  const discussedPictureElements = data.slice().sort((a, b) => b.comments.length - a.comments.length);
  const randomPictureElements = data.slice().sort((a) => a.id - getRandom(0, 24)).slice(0, 10);
  const target = evt.target.closest('.img-filters__button');
  const targetId = target.id;

  filterOptionElements.forEach((item) => item.classList.remove('img-filters__button--active'));
  target.classList.add('img-filters__button--active');

  switch (targetId) {
    case 'filter-random':
      thumbnailElements.forEach((item) => thumbnailsContainerElement.removeChild(item));
      renderThumbnails(randomPictureElements);
      break;
    case 'filter-discussed':
      thumbnailElements.forEach((item) => thumbnailsContainerElement.removeChild(item));
      renderThumbnails(discussedPictureElements);
      break;
    default:
      thumbnailElements.forEach((item) => thumbnailsContainerElement.removeChild(item));
      renderThumbnails(data);
      break;
  }
}

getData((data) => {
  renderThumbnails(data);

  filtersContainerElement.classList.remove('img-filters--inactive');
  filtersContainerElement.addEventListener('click', (evt) => {
    filterPictures(evt, data);
  });
});
