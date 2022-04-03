import {openBigPicture} from './gallery.js';

function renderThumbnails (data) {
  const thumbnailsContainerElement = document.querySelector('.pictures');
  const thumbnailTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
  const fragment = document.createDocumentFragment();

  data.forEach((item) => {
    const PictureInfo = {
      URL: item.url,
      LIKES: item.likes,
      COMMENTS: item.comments.length
    };
    const thumbnaiElement = thumbnailTemplateElement.cloneNode(true);

    thumbnaiElement.querySelector('.picture__img').src = PictureInfo.URL;
    thumbnaiElement.querySelector('.picture__likes').textContent = PictureInfo.LIKES;
    thumbnaiElement.querySelector('.picture__comments').textContent = PictureInfo.COMMENTS;
    fragment.append(thumbnaiElement);
  });

  thumbnailsContainerElement.append(fragment);

  thumbnailsContainerElement.addEventListener('click', (evt) => {
    openBigPicture(evt, data);
  });
}

export {renderThumbnails};
