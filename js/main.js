import {openBigPicture, thumbnailsContainerElement} from './gallery.js';
import './edit-form.js';
import {getData} from './api.js';
import {renderThumbnails} from './render-thumbnails.js';

getData((data) => {
  renderThumbnails(data);
  thumbnailsContainerElement.addEventListener('click', (evt) => {
    openBigPicture(evt, data);
  });
});
