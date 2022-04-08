import {checkLine} from './util.js';

const Hashtags = {
  SPLITTER: ' ',
  MAX_COUNT: 5,
  REG_EXP: /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/
};
const MAX_LENGTH = 140;

const uploadFormElement = document.querySelector('.img-upload__form');
const hashtagsInputElement = uploadFormElement.querySelector('.text__hashtags');
const descriptionFieldElement = uploadFormElement.querySelector('.text__description');
const pristine = window.Pristine(uploadFormElement, {
  classTo: 'text__wrapper',
  errorClass: 'img-upload__text--invalid',
  successClass: 'img-upload__text--valid',
  errorTextParent: 'text__wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

function getErrorMessage (value) {
  const hashTagsArray = value.split(Hashtags.SPLITTER);
  const hashTagsCount = hashTagsArray.length;
  const regExpCheck = hashTagsArray.every((item) => Hashtags.REG_EXP.test(item));
  const repeatHashtagsCheck = hashTagsArray.every((item, index, array) => array.slice(index+1, array.length).every((elem) => elem !== item));
  const hashtagsCountCheck = hashTagsCount <= Hashtags.MAX_COUNT;
  if (hashtagsCountCheck) {
    if (!regExpCheck) {return 'Формат хэштега "#хэштег" без пробелов и спецсимволов #, @, $';}
    if (!repeatHashtagsCheck) {return 'Такой Хэштег уже есть';}
  }
  return 'Не более пяти Хэштегов';
}

function validateHashtags (value) {
  const hashTagsArray = value.split(Hashtags.SPLITTER);
  const hashTagsCount = hashTagsArray.length;
  if (value !== '') {
    const regExpCheck = hashTagsArray.every((item) => Hashtags.REG_EXP.test(item));
    const repeatHashtagsCheck = hashTagsArray.every((item, index, array) => array.slice(index+1, array.length).every((elem) => elem !== item));
    const hashtagsCountCheck = hashTagsCount <= Hashtags.MAX_COUNT;

    return regExpCheck && repeatHashtagsCheck && hashtagsCountCheck;
  }
  return true;
}

function validateDescription (value) {
  return value !== '' ? checkLine(value, MAX_LENGTH) : true;
}

function validateUploadForm () {
  return pristine.validate();
}

pristine.addValidator(hashtagsInputElement, validateHashtags, getErrorMessage);
pristine.addValidator(descriptionFieldElement, validateDescription, `Не более ${MAX_LENGTH} символов`);

export {validateUploadForm,uploadFormElement, hashtagsInputElement, descriptionFieldElement};
