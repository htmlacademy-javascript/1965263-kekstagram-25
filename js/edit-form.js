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
const MIN_SCALE_VALUE = 0;
const MAX_SCALE_VALUE = 100;
const SCALE_STEP_VALUE = 25;
let scaleControlValue = MAX_SCALE_VALUE;

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
    submitButtonElement.disabled = true;
    const body = new FormData(evt.target);
    sendData(body);
  }
};

const onScaleSmallerElementClick = () => {
  const scaleValue = scaleControlValue > MIN_SCALE_VALUE ? scaleControlValue -= SCALE_STEP_VALUE : scaleControlValue;
  changeScale(scaleValue);
};

const onScaleBiggerElementClick = () => {
  const scaleValue = scaleControlValue < MAX_SCALE_VALUE ? scaleControlValue += SCALE_STEP_VALUE : scaleControlValue;
  changeScale(scaleValue);
};

const onEffectsContainerElementChange = (evt) => {
  changeEffect(evt);
};

const onSliderUpdate = () => {
  applyEffect();
};

function changeScale (scaleValue) {
  const QUOTIENT = 100;
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
  const Effects = {
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
  imageElement.style.filter = Effects[evt.target.value];
}

function applyEffect () {
  const SLIDER_VALUE = sliderElement.noUiSlider.get();
  const Effects = {
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
      imageElement.style.filter = Effects[item.value];
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
  editingFormElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  scaleControlValue = MAX_SCALE_VALUE;
  scaleControlValueElement.value = `${scaleControlValue}%`;
  imageElement.style.transform = 'scale(1)';
  imageElement.style.filter = 'none';
  effectElements[0].checked = true;

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
