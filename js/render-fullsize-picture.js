function renderCommentsBlock (comments) {
  const commentsContainer = document.querySelector('.social__comments');
  const tempContainer = document.createDocumentFragment();

  commentsContainer.innerHTML = '';

  comments.forEach((item, index) => {
    const Commentator = {
      AVATAR: item.avatar,
      NAME: item.name,
      MESSAGE: item.message
    };
    const commentsItem = document.createElement('li');

    commentsItem.classList.add('social__comment');
    if (index >= 5) {
      commentsItem.classList.add('hidden');
    }
    commentsItem.innerHTML = `<img class="social__picture" src="${Commentator.AVATAR}" alt="${Commentator.NAME}" width="35" height="35"><p class="social__text">${Commentator.MESSAGE}</p>`;
    tempContainer.append(commentsItem);
  });
  commentsContainer.append(tempContainer);
}

function showMoreComments () {
  const commentsContainer = document.querySelector('.social__comments');
  const allComments = commentsContainer.querySelectorAll('.social__comment');
  const socialCommentCount = document.querySelector('.social__comment-count');
  const hiddenComments = commentsContainer.querySelectorAll('.hidden');
  const commentsLoader = document.querySelector('.comments-loader');

  const ALL_COMMENTS_COUNT = allComments.length;
  const HIDDEN_COMMENTS_COUNT = hiddenComments.length;
  const SHOWN_COMMENTS_COUNT = ALL_COMMENTS_COUNT - HIDDEN_COMMENTS_COUNT;
  const SHOWN_COMMENTS_MAX_COUNT = 5;

  if (HIDDEN_COMMENTS_COUNT <= SHOWN_COMMENTS_MAX_COUNT) {
    hiddenComments.forEach((item) => item.classList.remove('hidden'));
    socialCommentCount.innerHTML = `${SHOWN_COMMENTS_COUNT + HIDDEN_COMMENTS_COUNT} из <span class="comments-count">${ALL_COMMENTS_COUNT}</span> комментариев`;
    commentsLoader.classList.add('hidden');
  } else {
    for (let i=0; i<SHOWN_COMMENTS_MAX_COUNT; i++) {
      hiddenComments[i].classList.remove('hidden');
    }
    socialCommentCount.innerHTML = `${SHOWN_COMMENTS_COUNT + SHOWN_COMMENTS_MAX_COUNT} из <span class="comments-count">${ALL_COMMENTS_COUNT}</span> комментариев`;
  }
}

function renderFullsizePicture (data) {
  const bigPicture = document.querySelector('.big-picture');
  const bigPicImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
  const pictureDescription = bigPicture.querySelector('.social__caption');
  const likesCount = bigPicture.querySelector('.likes-count');
  const socialCommentCount = bigPicture.querySelector('.social__comment-count');
  const commentsLoader = document.querySelector('.comments-loader');
  const PictureData = {
    URL: data.url,
    DESCRIPTION: data.description,
    LIKES: data.likes,
    COMMENTS_TOTAL_COUNT: data.comments.length,
    COMMENTS_DATA: data.comments,
    COMMENTS_MAX_COUNT: 5
  };

  bigPicImg.src = PictureData.URL;
  pictureDescription.textContent = PictureData.DESCRIPTION;
  likesCount.textContent = PictureData.LIKES;
  socialCommentCount.innerHTML = `${PictureData.COMMENTS_TOTAL_COUNT < PictureData.COMMENTS_MAX_COUNT ? PictureData.COMMENTS_TOTAL_COUNT : PictureData.COMMENTS_MAX_COUNT} из <span class="comments-count">${PictureData.COMMENTS_TOTAL_COUNT}</span> комментариев`;
  renderCommentsBlock(PictureData.COMMENTS_DATA);
  bigPicture.classList.remove('hidden');
  commentsLoader.classList.add('hidden');
  if (PictureData.COMMENTS_TOTAL_COUNT > PictureData.COMMENTS_MAX_COUNT) {
    commentsLoader.classList.remove('hidden');
  }
  document.body.classList.add('modal-open');
}

export {renderFullsizePicture};
export {showMoreComments};
