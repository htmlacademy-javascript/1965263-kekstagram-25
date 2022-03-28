import {openBigPicture} from './gallery.js';
import './edit-form.js';
import {getData} from './api.js';
import {renderThumbnails} from './render-thumbnails.js';

const thumbnailsContainerElement = document.querySelector('.pictures');

getData((data) => {
  renderThumbnails(data);
  thumbnailsContainerElement.addEventListener('click', (evt) => {
    openBigPicture(evt, data);
  });
});
