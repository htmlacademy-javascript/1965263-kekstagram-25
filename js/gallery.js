import {renderFullsizePicture} from './render-fullsize-picture.js';
import {showMoreComments} from './render-fullsize-picture.js';

const thumbnailsContainerElement = document.querySelector('.pictures');
const bigPictureElement = document.querySelector('.big-picture');
const loadCommentsElement = document.querySelector('.comments-loader');
const closeBigPictureElement = document.querySelector('.big-picture__cancel');

const onCloseBigPictureElementClick = () => {
  closeBigPicture();
};

const onDocumentEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
};

const onCommentsLoaderButtonClick = () => {
  showMoreComments();
};

function closeBigPicture () {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  closeBigPictureElement.removeEventListener('click', onCloseBigPictureElementClick);
  document.removeEventListener('keydown', onDocumentEscKeydown);
  loadCommentsElement.removeEventListener('click', onCommentsLoaderButtonClick);
}

function openBigPicture (evt, data) {
  const thumbnailElements = thumbnailsContainerElement.querySelectorAll('.picture');
  const targetElement = evt.target.closest('a');
  thumbnailElements.forEach((item, index) => {
    if (item === targetElement) {
      renderFullsizePicture(data[index]);
    }
  });

  closeBigPictureElement.addEventListener('click', onCloseBigPictureElementClick);
  document.addEventListener('keydown', onDocumentEscKeydown);
  loadCommentsElement.addEventListener('click', onCommentsLoaderButtonClick);
}

export {openBigPicture, thumbnailsContainerElement};
