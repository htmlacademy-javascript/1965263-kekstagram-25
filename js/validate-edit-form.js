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


function getErrorMessage (value) {
  const splitter = ' ';
  const hashtagsArray = value.split(splitter);
  const hashtagsNumber = hashtagsArray.length;
  const hashtagsMaxNumber = 5;
  const regExp = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

  const regExpCheck = hashtagsArray.every((item) => regExp.test(item));
  const repeatHashtagCheck = hashtagsArray.every((item, index, array) => array.slice(index+1, array.length).every((elem) => elem !== item));
  const hashtagsNumberCheck = hashtagsNumber <= hashtagsMaxNumber;
  if (hashtagsNumberCheck) {
    if (!regExpCheck) {return 'Формат хэштега "#хэштег" без пробелов и спецсимволов #, @, $';}
    if (!repeatHashtagCheck) {return 'Такой Хэштег уже есть';}
  }
  return 'Не более пяти Хэштегов';
}

function validateHashtags (value) {
  if (value !== '') {
    const splitter = ' ';
    const hashtagsArray = value.split(splitter);
    const hashtagsNumber = hashtagsArray.length;
    const hashtagsMaxNumber = 5;
    const regExp = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

    const regExpCheck = hashtagsArray.every((item) => regExp.test(item));
    const repeatHashtagCheck = hashtagsArray.every((item, index, array) => array.slice(index+1, array.length).every((elem) => elem !== item));
    const hashtagsNumberCheck = hashtagsNumber <= hashtagsMaxNumber;

    return regExpCheck && repeatHashtagCheck && hashtagsNumberCheck;
  }
  return true;
}

function validateDescription (value) {
  if (value !== '') {
    const lengthCheck = value.length <= 140;
    return lengthCheck;
  }
  return true;
}

pristine.addValidator(hashtagsInput, validateHashtags, getErrorMessage);
pristine.addValidator(descriptionField, validateDescription, 'Не более 140 символов');

function validateUploadForm (evt) {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
}

export {validateUploadForm};
export {uploadForm};
export {hashtagsInput};
export {descriptionField};
