import {sendData} from './api.js';
import {validateUploadForm} from './validate-edit-form.js';
import {uploadFormElement} from './validate-edit-form.js';
import {hashtagsInputElement} from './validate-edit-form.js';
import {descriptionFieldElement} from './validate-edit-form.js';

const uploadFileControlElement = document.querySelector('#upload-file');
const editingFormElement = uploadFormElement.querySelector('.img-upload__overlay');
const imageElement = uploadFormElement.querySelector('.img-upload__preview').querySelector('img');
const sliderElement = uploadFormElement.querySelector('.effect-level__slider');
const hiddenSliderValueElement = uploadFormElement.querySelector('.effect-level__value');
const effectsContainerElement = uploadFormElement.querySelector('.effects__list');
const effectElements = effectsContainerElement.querySelectorAll('.effects__radio');
const closeEditFormElement = editingFormElement.querySelector('.img-upload__cancel');
const scaleSmallerElement = editingFormElement.querySelector('.scale__control--smaller');
const scaleBiggerElement = editingFormElement.querySelector('.scale__control--bigger');
const scaleControlValueElement = editingFormElement.querySelector('.scale__control--value');
const submitButtonElement = editingFormElement.querySelector('.img-upload__submit');
const Scale = {
  MIN: 0,
  MAX: 100,
  STEP: 25
};
const QUOTIENT = 100;
let scaleControlValue = Scale.MAX;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const onCloseEditFormElementClick = () => {
  closeEditForm();
};

const onDocumentEscKeydown = (evt) => {
  const isHashtagInputFocused = hashtagsInputElement === document.activeElement;
  const isDescriptionFieldFocused = descriptionFieldElement === document.activeElement;
  if (evt.key === 'Escape' && !isHashtagInputFocused && !isDescriptionFieldFocused) {
    closeEditForm();
  }
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  if (validateUploadForm()) {
    submitButtonElement.setAttribute('disabled', true);
    const requestBody = new FormData(evt.target);
    sendData(requestBody);
  }
};

const onScaleSmallerElementClick = () => {
  const scaleValue = scaleControlValue > Scale.MIN ? scaleControlValue -= Scale.STEP : scaleControlValue;
  changeScale(scaleValue);
};

const onScaleBiggerElementClick = () => {
  const scaleValue = scaleControlValue < Scale.MAX ? scaleControlValue += Scale.STEP : scaleControlValue;
  changeScale(scaleValue);
};

const onEffectsContainerElementChange = (evt) => {
  changeEffect(evt);
};

const onSliderUpdate = () => {
  applyEffect();
};

function changeScale (scaleValue) {
  scaleControlValueElement.value = `${scaleValue}%`;
  imageElement.style.transform = `scale(${scaleValue/QUOTIENT})`;
}

function createSlider (evt) {
  noUiSlider.create(sliderElement, {
    range: {
      min: Number(evt.target.dataset.min),
      max: Number(evt.target.dataset.max),
    },
    start: Number(evt.target.dataset.max),
    step: Number(evt.target.dataset.step),
    connect: 'lower',
  });

  sliderElement.noUiSlider.on('update', onSliderUpdate);
}

function changeEffect (evt) {
  const effects = {
    'chrome': 'grayscale(1)',
    'sepia': 'sepia(1)',
    'marvin': 'invert(100%)',
    'phobos': 'blur(3px)',
    'heat': 'brightness(3)',
    'none': 'none'
  };
  if (sliderElement.innerHTML === '') {
    createSlider(evt);
  }
  if (evt.target.value !== 'none') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: Number(evt.target.dataset.min),
        max: Number(evt.target.dataset.max),
      },
      start: Number(evt.target.dataset.max),
      step: Number(evt.target.dataset.step),
    });
  } else {sliderElement.noUiSlider.destroy();}
  imageElement.style.filter = effects[evt.target.value];
}

function applyEffect () {
  const SLIDER_VALUE = sliderElement.noUiSlider.get();
  const effects = {
    'chrome': `grayscale(${SLIDER_VALUE})`,
    'sepia': `sepia(${SLIDER_VALUE})`,
    'marvin': `invert(${SLIDER_VALUE}%)`,
    'phobos': `blur(${SLIDER_VALUE}px)`,
    'heat': `brightness(${SLIDER_VALUE})`,
    'none': 'none'
  };
  hiddenSliderValueElement.value = SLIDER_VALUE;
  effectElements.forEach((item) => {
    if (item.checked) {
      imageElement.style.filter = effects[item.value];
    }
  });
}

function closeEditForm () {
  const errorMessageElements = document.querySelectorAll('.img-upload__error');
  editingFormElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  uploadFileControlElement.value = '';
  hashtagsInputElement.value = '';
  descriptionFieldElement.value = '';
  errorMessageElements.forEach((item) => {item.textContent = '';});
  if (sliderElement.innerHTML !== '') {
    sliderElement.noUiSlider.destroy();
  }

  closeEditFormElement.removeEventListener('click', onCloseEditFormElementClick);
  document.removeEventListener('keydown', onDocumentEscKeydown);
  uploadFormElement.removeEventListener('submit', onUploadFormSubmit);
  scaleSmallerElement.removeEventListener('click', onScaleSmallerElementClick);
  scaleBiggerElement.removeEventListener('click', onScaleBiggerElementClick);
  effectsContainerElement.addEventListener('change', onEffectsContainerElementChange);
}

function openEditForm () {
  const file = uploadFileControlElement.files[0];

  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));
  if (matches) {
    imageElement.src = URL.createObjectURL(file);
  }

  scaleControlValue = Scale.MAX;
  scaleControlValueElement.value = `${scaleControlValue}%`;
  imageElement.style.transform = 'scale(1)';
  imageElement.style.filter = 'none';
  effectElements[0].checked = true;

  editingFormElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  closeEditFormElement.addEventListener('click', onCloseEditFormElementClick);
  document.addEventListener('keydown', onDocumentEscKeydown);
  uploadFormElement.addEventListener('submit', onUploadFormSubmit);
  scaleSmallerElement.addEventListener('click', onScaleSmallerElementClick);
  scaleBiggerElement.addEventListener('click', onScaleBiggerElementClick);
  effectsContainerElement.addEventListener('change', onEffectsContainerElementChange);
}

const onUploadFileClick = () => {
  openEditForm();
};

uploadFileControlElement.addEventListener('change', onUploadFileClick);

export {closeEditForm, submitButtonElement};
