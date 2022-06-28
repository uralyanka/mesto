import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
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
  profileValidation.toggleButtonState()
}

//Submit добавления карточки
const handleCardFormSubmit = (data) => {

  const cardElement = createElement({
    name: data['mesto-name'],
    link: data['mesto-link']
  })

  cardList.addItem(cardElement)
  addCardPopup.closePopup()
  newCardValidation.toggleButtonState()
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
  addCardPopup.openPopup()
});

//Открытие попапа добавления карточки
btnEditUser.addEventListener('click', () => {
  const { name, bio } = userInfo.getUserInfo()
  nameUserInput.value = name
  bioUserInput.value = bio
  editUserPopup.openPopup()
});

//Активация валидации
profileValidation.enableValidation();
newCardValidation.enableValidation(); 