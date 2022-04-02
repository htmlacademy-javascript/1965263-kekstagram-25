const SHOWN_COMMENTS_MAX_COUNT = 5;

function renderCommentsBlock (comments) {
  const commentsContainerElement = document.querySelector('.social__comments');
  const tempContainer = document.createDocumentFragment();

  commentsContainerElement.innerHTML = '';

  comments.forEach((item, index) => {
    const Commentator = {
      AVATAR: item.avatar,
      NAME: item.name,
      MESSAGE: item.message
    };
    const commentElement = document.createElement('li');

    commentElement.classList.add('social__comment');
    if (index >= SHOWN_COMMENTS_MAX_COUNT) {
      commentElement.classList.add('hidden');
    }
    commentElement.innerHTML = `<img class="social__picture" src="${Commentator.AVATAR}" alt="${Commentator.NAME}" width="35" height="35"><p class="social__text">${Commentator.MESSAGE}</p>`;
    tempContainer.append(commentElement);
  });
  commentsContainerElement.append(tempContainer);
}

function showMoreComments () {
  const commentsContainerElement = document.querySelector('.social__comments');
  const allCommentElements = commentsContainerElement.querySelectorAll('.social__comment');
  const socialCommentCountElement = document.querySelector('.social__comment-count');
  const hiddenCommentElements = commentsContainerElement.querySelectorAll('.hidden');
  const commentsLoaderElement = document.querySelector('.comments-loader');

  const allCommentsCount = allCommentElements.length;
  const hiddenCommentsCount = hiddenCommentElements.length;
  const shownCommentsCount = allCommentsCount - hiddenCommentsCount;

  if (hiddenCommentsCount <= SHOWN_COMMENTS_MAX_COUNT) {
    hiddenCommentElements.forEach((item) => item.classList.remove('hidden'));
    socialCommentCountElement.innerHTML = `${shownCommentsCount + hiddenCommentsCount} из <span class="comments-count">${allCommentsCount}</span> комментариев`;
    commentsLoaderElement.classList.add('hidden');
  } else {
    for (let i=0; i<SHOWN_COMMENTS_MAX_COUNT; i++) {
      hiddenCommentElements[i].classList.remove('hidden');
    }
    socialCommentCountElement.innerHTML = `${shownCommentsCount + SHOWN_COMMENTS_MAX_COUNT} из <span class="comments-count">${allCommentsCount}</span> комментариев`;
  }
}

function renderFullsizePicture (data) {
  const bigPictureElement = document.querySelector('.big-picture');
  const bigPicImageElement = bigPictureElement.querySelector('.big-picture__img').querySelector('img');
  const pictureDescriptionElement = bigPictureElement.querySelector('.social__caption');
  const likesCountElement = bigPictureElement.querySelector('.likes-count');
  const commentsCountElement = bigPictureElement.querySelector('.social__comment-count');
  const commentsLoaderElement = document.querySelector('.comments-loader');
  const PictureData = {
    URL: data.url,
    DESCRIPTION: data.description,
    LIKES: data.likes,
    COMMENTS_TOTAL_COUNT: data.comments.length,
    COMMENTS_DATA: data.comments,
    COMMENTS_MAX_COUNT: 5
  };

  bigPicImageElement.src = PictureData.URL;
  pictureDescriptionElement.textContent = PictureData.DESCRIPTION;
  likesCountElement.textContent = PictureData.LIKES;
  commentsCountElement.innerHTML = `${PictureData.COMMENTS_TOTAL_COUNT < PictureData.COMMENTS_MAX_COUNT ? PictureData.COMMENTS_TOTAL_COUNT : PictureData.COMMENTS_MAX_COUNT} из <span class="comments-count">${PictureData.COMMENTS_TOTAL_COUNT}</span> комментариев`;
  renderCommentsBlock(PictureData.COMMENTS_DATA);
  bigPictureElement.classList.remove('hidden');
  commentsLoaderElement.classList.add('hidden');
  if (PictureData.COMMENTS_TOTAL_COUNT > PictureData.COMMENTS_MAX_COUNT) {
    commentsLoaderElement.classList.remove('hidden');
  }
  document.body.classList.add('modal-open');
}

export {renderFullsizePicture, showMoreComments};
