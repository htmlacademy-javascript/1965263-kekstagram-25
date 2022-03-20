import {fakeServerResponse} from './data.js';
import {renderThumbnails} from './render-thumbnails.js';
import {renderFullsizePicture} from './render-fullsize-picture.js';

const data = fakeServerResponse();
const picturesContainer = document.querySelector('.pictures');
const closeBigPictureButton = document.querySelector('.big-picture__cancel');

renderThumbnails(data);

const onCloseBigPictureButtonClick = () => {
  closeBigPicture();
};

const onDocumentEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
};

function closeBigPicture () {
  document.querySelector('.big-picture').classList.add('hidden');
  document.body.classList.remove('modal-open');

  closeBigPictureButton.removeEventListener('click', onCloseBigPictureButtonClick);

  document.removeEventListener('keydown', onDocumentEscKeydown);
}

function openBigPicture (evt) {
  const targetItem = evt.target.closest('a');
  const itemCollection = picturesContainer.querySelectorAll('.picture');
  itemCollection.forEach((item, index) => {
    if (item === targetItem) {
      renderFullsizePicture(data[index]);
    }
  });

  closeBigPictureButton.addEventListener('click', onCloseBigPictureButtonClick);

  document.addEventListener('keydown', onDocumentEscKeydown);
}

picturesContainer.addEventListener('click', (evt) => {
  openBigPicture(evt);
});
