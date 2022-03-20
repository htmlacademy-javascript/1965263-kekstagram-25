import {validateUploadForm} from './validate-edit-form.js';
import {uploadForm} from './validate-edit-form.js';
import {hashtagsInput} from './validate-edit-form.js';
import {descriptionField} from './validate-edit-form.js';

const uploadFileControl = document.querySelector('#upload-file');
const editForm = uploadForm.querySelector('.img-upload__overlay');
const closeEditFormButton = editForm.querySelector('.img-upload__cancel');

const onCloseEditFormButtonClick = () => {
  closeEditForm();
};

const onDocumentEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closeEditForm();
  }
};

const onUploadFormSubmit = (evt) => {
  validateUploadForm(evt);
};

function closeEditForm () {
  const isHashtagInputFocused = hashtagsInput === document.activeElement;
  const isDescriptionFieldFocused = descriptionField === document.activeElement;
  if (!isHashtagInputFocused && !isDescriptionFieldFocused) {
    editForm.classList.add('hidden');
    document.body.classList.remove('modal-open');
    uploadFileControl.value = '';
    closeEditFormButton.removeEventListener('click', onCloseEditFormButtonClick);
    document.removeEventListener('keydown', onDocumentEscKeydown);
  }
}

function openEditForm () {
  editForm.classList.remove('hidden');
  document.body.classList.add('modal-open');

  closeEditFormButton.addEventListener('click', onCloseEditFormButtonClick);
  document.addEventListener('keydown', onDocumentEscKeydown);
  uploadForm.addEventListener('submit', onUploadFormSubmit);
}

const onUploadFileClick = () => {
  openEditForm();
};

uploadFileControl.addEventListener('change', onUploadFileClick);
