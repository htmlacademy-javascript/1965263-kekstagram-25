import {checkLine} from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const descriptionField = uploadForm.querySelector('.text__description');
const pristine = new Pristine(uploadForm, {
  classTo: 'text__wrapper',
  errorClass: 'img-upload__text--invalid',
  successClass: 'img-upload__text--valid',
  errorTextParent: 'text__wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});
const Hashtags = {
  SPLITTER: ' ',
  MAX_COUNT: 5,
  REG_EXP: /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/
};


function getErrorMessage (value) {
  const HASHTAGS_ARRAY = value.split(Hashtags.SPLITTER);
  const HASHTAGS_COUNT = HASHTAGS_ARRAY.length;
  const REG_EXP_CHECK = HASHTAGS_ARRAY.every((item) => Hashtags.REG_EXP.test(item));
  const REPEAT_HASHTAG_CHECK = HASHTAGS_ARRAY.every((item, index, array) => array.slice(index+1, array.length).every((elem) => elem !== item));
  const HASHTAGS_COUNT_CHECK = HASHTAGS_COUNT <= Hashtags.MAX_COUNT;
  if (HASHTAGS_COUNT_CHECK) {
    if (!REG_EXP_CHECK) {return 'Формат хэштега "#хэштег" без пробелов и спецсимволов #, @, $';}
    if (!REPEAT_HASHTAG_CHECK) {return 'Такой Хэштег уже есть';}
  }
  return 'Не более пяти Хэштегов';
}

function validateHashtags (value) {
  const HASHTAGS_ARRAY = value.split(Hashtags.SPLITTER);
  const HASHTAGS_COUNT = HASHTAGS_ARRAY.length;
  if (value !== '') {
    const REG_EXP_CHECK = HASHTAGS_ARRAY.every((item) => Hashtags.REG_EXP.test(item));
    const REPEAT_HASHTAG_CHECK = HASHTAGS_ARRAY.every((item, index, array) => array.slice(index+1, array.length).every((elem) => elem !== item));
    const HASHTAGS_COUNT_CHECK = HASHTAGS_COUNT <= Hashtags.MAX_COUNT;

    return REG_EXP_CHECK && REPEAT_HASHTAG_CHECK && HASHTAGS_COUNT_CHECK;
  }
  return true;
}

function validateDescription (value) {
  const MAX_LENGTH = 140;
  return value !== '' ? checkLine(value, MAX_LENGTH) : true;
}

function validateUploadForm (evt) {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
}

export {validateUploadForm};
export {uploadForm};
export {hashtagsInput};
export {descriptionField};
export {pristine};
export {validateHashtags};
export {getErrorMessage};
export {validateDescription};
