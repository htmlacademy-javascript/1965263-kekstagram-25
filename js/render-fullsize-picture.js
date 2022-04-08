const SHOWN_COMMENTS_MAX_COUNT = 5;

const commentsContainerElement = document.querySelector('.social__comments');
const bigPictureElement = document.querySelector('.big-picture');
const bigPicImageElement = bigPictureElement.querySelector('.big-picture__img').querySelector('img');
const pictureDescriptionElement = bigPictureElement.querySelector('.social__caption');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentsCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = document.querySelector('.comments-loader');

function renderCommentsBlock (comments) {
  const fragment = document.createDocumentFragment();

  commentsContainerElement.innerHTML = '';

  comments.forEach((item, index) => {
    const commentator = {
      avatar: item.avatar,
      name: item.name,
      message: item.message
    };
    const commentElement = document.createElement('li');
    const imageElement = document.createElement('img');
    const textElement = document.createElement('p');
    commentElement.classList.add('social__comment');
    if (index >= SHOWN_COMMENTS_MAX_COUNT) {
      commentElement.classList.add('hidden');
    }
    imageElement.classList.add('social__picture');
    imageElement.setAttribute('src', commentator.avatar);
    imageElement.setAttribute('alt', commentator.name);
    textElement.classList.add('social__text');
    textElement.textContent = commentator.message;
    commentElement.append(imageElement);
    commentElement.append(textElement);
    fragment.append(commentElement);
  });
  commentsContainerElement.append(fragment);
}

function showMoreComments () {
  const allCommentElements = commentsContainerElement.querySelectorAll('.social__comment');
  const socialCommentCountElement = document.querySelector('.social__comment-count');
  const hiddenCommentElements = commentsContainerElement.querySelectorAll('.hidden');

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

function renderFullSizePicture (data) {
  const pictureData = {
    url: data.url,
    description: data.description,
    likes: data.likes,
    commentsTotalCount: data.comments.length,
    commentsData: data.comments
  };

  bigPicImageElement.src = pictureData.url;
  pictureDescriptionElement.textContent = pictureData.description;
  likesCountElement.textContent = pictureData.likes;
  commentsCountElement.innerHTML = `${pictureData.commentsTotalCount < SHOWN_COMMENTS_MAX_COUNT ? pictureData.commentsTotalCount : SHOWN_COMMENTS_MAX_COUNT} из <span class="comments-count">${pictureData.commentsTotalCount}</span> комментариев`;
  renderCommentsBlock(pictureData.commentsData);
  bigPictureElement.classList.remove('hidden');
  commentsLoaderElement.classList.add('hidden');
  if (pictureData.commentsTotalCount > SHOWN_COMMENTS_MAX_COUNT) {
    commentsLoaderElement.classList.remove('hidden');
  }
  document.body.classList.add('modal-open');
}

export {renderFullSizePicture, showMoreComments};
