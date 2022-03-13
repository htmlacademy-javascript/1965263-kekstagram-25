function renderCommentsBlock (comments) {
  const commentsContainer = document.querySelector('.social__comments');
  const tempContainer = document.createDocumentFragment();

  comments.forEach((item) => {
    const Commentator = {
      AVATAR: item.avatar,
      NAME: item.name,
      MESSAGE: item.message
    };
    const commentsItem = document.createElement('li');

    commentsItem.classList.add('social__comment');
    commentsItem.innerHTML = `<img class="social__picture" src="${Commentator.AVATAR}" alt="${Commentator.NAME}" width="35" height="35"><p class="social__text">${Commentator.MESSAGE}</p>`;
    tempContainer.append(commentsItem);
  });
  commentsContainer.append(tempContainer);
}

function renderFullsizePicture (data) {
  const bigPicture = document.querySelector('.big-picture');
  const bigPicImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
  const pictureDescription = bigPicture.querySelector('.social__caption');
  const likesCount = bigPicture.querySelector('.likes-count');
  const commentsCount = bigPicture.querySelector('.comments-count');
  const socialCommentCount = bigPicture.querySelector('.social__comment-count');
  const commentsLoader = bigPicture.querySelector('.comments-loader');
  const PictureData = {
    URL: data.url,
    DESCRIPTION: data.description,
    LIKES: data.likes,
    COMMENTS_COUNT: data.comments.length,
    COMMENTS_DATA: data.comments
  };

  bigPicImg.src = PictureData.URL;
  pictureDescription.textContent = PictureData.DESCRIPTION;
  likesCount.textContent = PictureData.LIKES;
  commentsCount.textContent = PictureData.COMMENTS_COUNT;
  renderCommentsBlock(PictureData.COMMENTS_DATA);
  bigPicture.classList.remove('hidden');

  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
}

export {renderFullsizePicture};
