import './index.css';

import Api from '../components/Api';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { 
  initialElements,
  formElementEdit,
  btnEditUser,
  nameUserInput,
  bioUserInput,
  btnAddElement,
  formElementAdd
 } from '../utils/constants.js';

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

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-44',
  headers: {
    authorization: '552f6cf5-9624-4487-82c3-a3748eda88d5',
    'Content-Type': 'application/json',
  }
});

//Создание карточки by Card
function createElement(cardData) {
  const cardElement = new Card(cardData, '#element-template', () => {
    imagePopup.openPopup(cardData.name, cardData.link)
  });
  return cardElement.createCard();
}

//Рендер массива by Section 
const cardList = new Section(
  {
  items: initialElements,
  renderer: (item) => {
    const cardElement = createElement(item)
    cardList.addItem(cardElement)
    }
  },
    '.elements__items'
);

cardList.renderItems();

//Submit редактирования профиля
const handleProfileFormSubmit= (data) => {
  const { name, bio } = data
  userInfo.setUserInfo(name, bio)
  editUserPopup.closePopup()
}

//Submit добавления карточки
const handleCardFormSubmit = (data) => {

  const cardElement = createElement({
    name: data['mesto-name'],
    link: data['mesto-link']
  })

  cardList.addItem(cardElement)
  addCardPopup.closePopup()
}

const imagePopup = new PopupWithImage('.popup_type_view-mesto');
const userInfo = new UserInfo({ profileNameSelector: '.profile__user-name', profileBioSelector: '.profile__user-bio'})
const editUserPopup = new PopupWithForm('.popup_type_user-edit', handleProfileFormSubmit)
const addCardPopup = new PopupWithForm('.popup_type_add-mesto', handleCardFormSubmit)

imagePopup.setEventListeners();
editUserPopup.setEventListeners();
addCardPopup.setEventListeners();

//Открытие попапа редактирования профиля
btnAddElement.addEventListener('click', () => {
  newCardValidation.resetValidation()
  addCardPopup.openPopup()
});

//Открытие попапа добавления карточки
btnEditUser.addEventListener('click', () => {
  const { name, bio } = userInfo.getUserInfo()
  nameUserInput.value = name
  bioUserInput.value = bio
  
  profileValidation.resetValidation()
  editUserPopup.openPopup()
});

//Активация валидации
profileValidation.enableValidation();
newCardValidation.enableValidation(); 