const elementsList = document.querySelector('.elements__items');
const elementTemplate = document.querySelector('#element-template').content;

const popupViewImageElement = document.querySelector('.popup_type_view-mesto');
const imageLink = document.querySelector('.popup__figure-image');
const imageName = document.querySelector('.popup__figure-caption');
const btnCloseImageElement = document.querySelector('.popup__close-btn_type_view-mesto');

const btnEditUser = document.querySelector('.profile__user-edit-button');
const btnCloseEditUser = document.querySelector('.popup__close-btn_type_user-edit');
const popupEditUser = document.querySelector('.popup_type_user-edit');
const formElementEdit = popupEditUser.querySelector('.popup__form_type_user-edit');
const nameUserInput = formElementEdit.querySelector('.popup__input_type_user-name');
const bioUserInput = formElementEdit.querySelector('.popup__input_type_user-bio');
const userName = document.querySelector('.profile__user-name');
const userBio = document.querySelector('.profile__user-bio');

const btnAddElement = document.querySelector('.profile__add-button');
const btnCloseAddElement = document.querySelector('.popup__close-btn_type_add-mesto');
const popupAddElement = document.querySelector('.popup_type_add-mesto');
const formElementAdd = popupAddElement.querySelector('.popup__form_type_add-mesto');
const nameImageInput = formElementAdd.querySelector('.popup__input_type_mesto-name');
const linkImageInput = formElementAdd.querySelector('.popup__input_type_mesto-link');

//Функция открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
  popup.addEventListener('click', closePopupByClickMouse);
}

//Функции закрытия попапов
function closePopupByEsc(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popupOpened);
  }
};

function closePopupByClickMouse(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
  popup.removeEventListener('click', closePopupByClickMouse);
}


//Функция для лайка
function likeElement(evt) {
  const likeElement = evt.currentTarget;
  likeElement.classList.toggle('elements__item-like_active');
};

//Функция для удаления места
function deleteElement(evt) {
  const deleteElement = evt.currentTarget.closest('.elements__item');
  deleteElement.remove();
}

//Функция для просмотра места
function viewImageElement(evt) {
  openPopup(popupViewImageElement);
  imageLink.src = evt.target.src;
  imageLink.alt = evt.target.alt;
  imageName.textContent = evt.target.alt;
}

//Функция для конца просмотра места :D*/
function closeViewImageElement () {
  closePopup(popupViewImageElement);
};

//Функция создания нового места
function createElement(element) {
  const itemElement = elementTemplate.cloneNode(true);
  const elementImage = itemElement.querySelector('.elements__item-image');
  elementImage.src = element.link;
  elementImage.alt = element.name;
  itemElement.querySelector('.elements__item-name').textContent = element.name;
  
  itemElement.querySelector('.elements__item-like').addEventListener('click', likeElement);
  itemElement.querySelector('.elements__trash-btn').addEventListener('click', deleteElement);
  elementImage.addEventListener('click', viewImageElement);
  
  return itemElement;
};

function renderElement(element) {
  elementsList.prepend(createElement(element));
}

//Добавление массива на страницу
initialElements.reverse().forEach(renderElement);

//Функция сохранения в карандаше
function formSubmitHandler (evt) {
  evt.preventDefault(); 
  userName.textContent = nameUserInput.value;
  userBio.textContent = bioUserInput.value;
  closePopup(popupEditUser);
}

//Функция добавления в +
function addElement(evt) {
  evt.preventDefault();
  const element = {};
  element.name = nameImageInput.value;
  element.alt = nameImageInput.value;
  element.link = linkImageInput.value;
  renderElement(element);
  closePopup(popupAddElement);
}

//КНОПКА +
btnAddElement.addEventListener('click', function () {
  openPopup(popupAddElement);
  nameImageInput.value = '';
  linkImageInput.value = '';
});

btnCloseAddElement.addEventListener('click', () => closePopup(popupAddElement));

//КНОПКА КАРАНДАШ
btnEditUser.addEventListener('click', function () {
  openPopup(popupEditUser);
  nameUserInput.value = userName.innerText;
  bioUserInput.value = userBio.innerText;
});

btnCloseEditUser.addEventListener('click', () => closePopup(popupEditUser));

//КНОПКА закрыть просмотр
btnCloseImageElement.addEventListener('click', closeViewImageElement);
//КНОПКА сохранить
formElementEdit.addEventListener('submit', formSubmitHandler);
//КНОПКА создать
formElementAdd.addEventListener('submit', addElement); 


//ВАЛИДАЦИЯ

/*
//Переменные
const form = document.querySelector('.popup__form');
const submit = document.querySelector('.popup__submit-btn');

//Слушатели
form.addEventListener('submit', handleSubmitForm);

//Функции
function validate(element) {
  const errorElement = document.querySelector(`#error-${element.id}`);
  if (!element.checkValidity()) {
    errorElement.textContent = element.validationMessage;
    activateError(errorElement);
  }
}

function activateError(element) {
  element.parentNode.classList.add('popup__input-container_invalid');
}

function handleSubmitForm(event) {
  event.preventDefault();

  const inputs = Array.from(form.elements);

  inputs.forEach((element) => {
    if (element.id !== submit.id) {
      validate(element);
    }
  })
}

*/

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

const toggleButtonState = (inputList, buttonElement) => {

  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__submit-btn_inactive');
  } else {
    buttonElement.classList.remove('popup__submit-btn_inactive');
  }
}; 

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__submit-btn');
  
  toggleButtonState(inputList, buttonElement);
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    });
    setEventListeners(formElement);
    });
  };
  
  enableValidation();


/*
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}); */

