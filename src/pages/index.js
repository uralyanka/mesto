import './index.css';

import Api from '../components/Api';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import { 
  formElementEdit,
  initialElements,
  btnEditUser,
  nameUserInput,
  bioUserInput,
  btnAddElement,
  formElementAdd,
  btnUpAvatar,
  popupUpAvatar,
  formElementAvatar
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
const upAvatarValidation = new FormValidator(formData, formElementAvatar);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-44',
  headers: {
    authorization: '552f6cf5-9624-4487-82c3-a3748eda88d5',
    'Content-Type': 'application/json',
  }
});

//Создание карточки классом Card
function createElement(cardData) {
  const cardElement = new Card(cardData, '#element-template', () => {
    imagePopup.openPopup(cardData.name, cardData.link)
  });
  return cardElement.createCard();
}

//Рендер карточек классом Section 
const cardList = (cardsData) => {
  const section = new Section(
    {
      items: cardsData,
      renderer: (item) => {
      const cardElement = createElement(item)
      section.addItem(cardElement)
      }
    },
      '.elements__items');
      return section
};

//Карточки и профиль с API
Promise.all([api.getUserData(), api.getCards()])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo(
      userData.name,
      userData.about,
      userData.avatar
    );
    return cardList(cardsData);
  })
  .then((card) => {
    card.renderItems();
  })
  .catch((err) => {
    console.log(err);
  })

//Редактирование профиля с API
const handleProfileFormSubmit = (data) => {
  editUserPopup.renderLoading(true);
  api.setUserData(data.name, data.bio)
    .then(res => {
      userInfo.setUserInfo(res.name, res.about);
      editUserPopup.closePopup();
    })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    editUserPopup.renderLoading(false);
  });
}

const cardD = new Section(
  {
  items: initialElements,
  renderer: (item) => {
    const cardElement = createElement(item)
    cardList.addItem(cardElement)
    }
  },
    '.elements__items'
);


/*//Submit добавления карточки
const handleCardFormSubmit = (data) => {

  const cardElement = createElement({
    name: data['mesto-name'],
    link: data['mesto-link']
  })

  cardD.addItem(cardElement)
  addCardPopup.closePopup()
} */

//Submit добавления карточки
const handleCardFormSubmit = (data) => {

  addCardPopup.renderLoading(true)
  api.addCard(data.name, data.link)
  .then(res => {
  const cardElement = createElement({
    name: res.name,
    link: res.link,
    _id: res._id,
  })

  cardD.addItem(cardElement)
  addCardPopup.closePopup()
  })
  .catch((err) => {
  console.log(err);
  })
  .finally(() => {
  addCardPopup.renderLoading(false);
  });
}

//Submit обновления аватара
const handleAvatarFormSubmit = (data) => {
  upAvatarPopup.renderLoading(true);
  api.updateAvatar(data['avatar-link'])
  .then(res => {
    userInfo.setAvatar(res.avatar);
    upAvatarPopup.closePopup();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    upAvatarPopup.renderLoading(false);
  });
}

const imagePopup = new PopupWithImage('.popup_type_view-mesto');

const userInfo = new UserInfo({ 
  profileNameSelector: '.profile__user-name', 
  profileBioSelector: '.profile__user-bio',
  profileAvatarSelector: '.profile__avatar-image'
});

const editUserPopup = new PopupWithForm('.popup_type_user-edit', handleProfileFormSubmit)
const addCardPopup = new PopupWithForm('.popup_type_add-mesto', handleCardFormSubmit)
const upAvatarPopup = new PopupWithForm('.popup_type_update-avatar', handleAvatarFormSubmit)

imagePopup.setEventListeners();
editUserPopup.setEventListeners();
addCardPopup.setEventListeners();
upAvatarPopup.setEventListeners();

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

//Открытие попапа обновления аватара
btnUpAvatar.addEventListener('click', () => {
  //upAvatarValidation.resetValidation()
  upAvatarPopup.openPopup();
}); 

//Активация валидации
profileValidation.enableValidation();
newCardValidation.enableValidation(); 
upAvatarValidation.enableValidation(); 