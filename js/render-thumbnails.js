import {fakeServerResponse} from './data.js';

const thumbnailsData = fakeServerResponse();
const thumbnailsContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const tempContainer = document.createDocumentFragment();

thumbnailsData.forEach((item) => {
  const PictureInfo = {
    URL: item.url,
    LIKES: item.likes,
    COMMENTS: item.comments.length
  };
  const thumbnailItem = thumbnailTemplate.cloneNode(true);

  thumbnailItem.querySelector('.picture__img').src = PictureInfo.URL;
  thumbnailItem.querySelector('.picture__likes').textContent = PictureInfo.LIKES;
  thumbnailItem.querySelector('.picture__comments').textContent = PictureInfo.COMMENTS;
  tempContainer.append(thumbnailItem);
});

thumbnailsContainer.append(tempContainer);
