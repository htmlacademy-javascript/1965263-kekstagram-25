import './edit-form.js';
import {getData} from './api.js';
import {renderThumbnails} from './render-thumbnails.js';
import {filtersContainerElement, filterPictures} from './filter.js';

getData((data) => {
  renderThumbnails(data);
  filtersContainerElement.classList.remove('img-filters--inactive');
  filtersContainerElement.addEventListener('click', (evt) => {
    filterPictures(evt, data);
  });
});
