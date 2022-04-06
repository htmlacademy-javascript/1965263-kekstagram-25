import {openBigPicture} from './gallery.js';

const thumbnailsContainerElement = document.querySelector('.pictures');
const thumbnailTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

function renderThumbnails (data) {
  const fragment = document.createDocumentFragment();

  data.forEach((item) => {
    const pictureData = {
      url: item.url,
      likes: item.likes,
      comments: item.comments.length
    };
    const thumbnaiElement = thumbnailTemplateElement.cloneNode(true);

    thumbnaiElement.querySelector('.picture__img').src = pictureData.url;
    thumbnaiElement.querySelector('.picture__likes').textContent = pictureData.likes;
    thumbnaiElement.querySelector('.picture__comments').textContent = pictureData.comments;
    fragment.append(thumbnaiElement);
  });

  thumbnailsContainerElement.append(fragment);

  thumbnailsContainerElement.addEventListener('click', (evt) => {
    openBigPicture(evt, data);
  });
}

export {renderThumbnails};
