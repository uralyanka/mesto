import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import { initialElements } from '../utils/constants.js';

const btnEditUser = document.querySelector('.profile__user-edit-button');
const popupEditUser = document.querySelector('.popup_type_user-edit');
const formElementEdit = popupEditUser.querySelector('.popup__form_type_user-edit');
const nameUserInput = formElementEdit.querySelector('.popup__input_type_user-name');
const bioUserInput = formElementEdit.querySelector('.popup__input_type_user-bio');
const userName = document.querySelector('.profile__user-name');
const userBio = document.querySelector('.profile__user-bio');

const btnAddElement = document.querySelector('.profile__add-button');
const popupAddElement = document.querySelector('.popup_type_add-mesto');
const formElementAdd = popupAddElement.querySelector('.popup__form_type_add-mesto');
const nameImageInput = formElementAdd.querySelector('.popup__input_type_mesto-name');
const linkImageInput = formElementAdd.querySelector('.popup__input_type_mesto-link');

const closeButtons = document.querySelectorAll('.popup__close-btn');

const formData = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const profileValidation = new FormValidator(formData, formElementEdit);
const newCardValidation = new FormValidator(formData, formElementAdd);

//Функция открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
  popup.addEventListener('mousedown', closePopupByClickMouse);
}

//Функции закрытия попапов
function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
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
  popup.removeEventListener('mousedown', closePopupByClickMouse);
}

//Функция закрытия любого попапа по крестику
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
}); 

//обработка Card
function createElement(cardData) {
  const cardElement = new Card(cardData, '#element-template', () => {
    imagePopup.openPopup(cardData.name, cardData.link)
  });
  return cardElement.createCard();
}

//Рендер массива через обработку Section 
const cardList = new Section(
  {
  items: initialElements,
  renderer: (item) => {
    const cardElement = createElement(item);
    cardList.addItem(cardElement);
    }
  },
    '.elements__items'
);

cardList.renderItems();

//Открытие попапа с картинкой через PopupWithImage 
const imagePopup = new PopupWithImage('.popup_type_view-mesto');
imagePopup.setEventListeners();

//Функция сохранения в карандаше
function saveUserProfile (evt) {
  evt.preventDefault(); 
  userName.textContent = nameUserInput.value;
  userBio.textContent = bioUserInput.value;
  closePopup(popupEditUser);
  profileValidation.toggleButtonState();
}

//Функция добавления в +
function addElement(evt) {
  evt.preventDefault();

  const cardElement = createElement({
    name: nameImageInput.value,
    alt: nameImageInput.value,
    link: linkImageInput.value
  })
  cardList.addItem(cardElement);

  evt.target.reset();
  closePopup(popupAddElement);
  newCardValidation.toggleButtonState();
}

//КНОПКА +
btnAddElement.addEventListener('click', function () {
  openPopup(popupAddElement);
});

//КНОПКА КАРАНДАШ
btnEditUser.addEventListener('click', function () {
  openPopup(popupEditUser);
  nameUserInput.value = userName.innerText;
  bioUserInput.value = userBio.innerText;
});

//КНОПКА сохранить
formElementEdit.addEventListener('submit', saveUserProfile);
//КНОПКА создать
formElementAdd.addEventListener('submit', addElement); 

//активация ВАЛИДАЦИИ
profileValidation.enableValidation();
newCardValidation.enableValidation(); 