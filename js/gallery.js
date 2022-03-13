import {fakeServerResponse} from './data.js';
import {renderThumbnails} from './render-thumbnails.js';
import {renderFullsizePicture} from './render-fullsize-picture.js';

const data = fakeServerResponse();
const picturesContainer = document.querySelector('.pictures');
const closeBigPictureButton = document.querySelector('.big-picture__cancel');

renderThumbnails(data);

picturesContainer.addEventListener('click', (evt) => {
  evt.preventDefault();
  const targetItem = evt.target.closest('a');
  const itemCollection = targetItem.parentElement.querySelectorAll('.picture');
  itemCollection.forEach((item, index) => {
    if (item === targetItem) {
      renderFullsizePicture(data[index]);
    }
  });
});

closeBigPictureButton.addEventListener('click', () => {
  document.querySelector('.big-picture').classList.add('hidden');
  document.body.classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    document.querySelector('.big-picture').classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
});
