//import {Card} from './сard.js';

//Исходный массив (перенесла обратно, чтобы не путаться в файлах)
const initialElements = [
  {
    name: 'Луна',
    link: 'https://img3.goodfon.ru/original/1024x768/c/fc/kosmos-luna-nebo.jpg',
  },
  {
    name: 'Моя планета Мелмак',
    link: 'https://avatars.mds.yandex.net/get-zen_doc/1821029/pub_5eafa60434cbba0565c6b3f2_5eafdcae0ab5b766d08574d5/scale_1200',
  },
  {
    name: 'Планета Венера',
    link: 'https://img4.goodfon.ru/original/1280x800/7/71/venera-planeta-solnechnaia-sistema.jpg',
  },
  {
    name: 'Планета Марс',
    link: 'https://img5.goodfon.ru/original/1024x768/d/86/kosmos-planeta-mars.jpg',
  },
  {
    name: 'Меркурий',
    link: 'https://img5.goodfon.ru/original/1280x800/f/d5/vadim-sadovski-by-vadim-sadovski-space-system-of-sun.jpg',
  },
  {
    name: 'Юпитер',
    link: 'https://img5.goodfon.ru/original/1280x800/2/4e/kosmos-planeta-iupiter.jpg',
  }
];

const elementsList = document.querySelector('.elements__items');
const elementTemplate = document.querySelector('#element-template').content;

const popupViewImageElement = document.querySelector('.popup_type_view-mesto');
const imageLink = document.querySelector('.popup__figure-image');
const imageName = document.querySelector('.popup__figure-caption');

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


/*/Функция для лайка
function likeElement(evt) {
  const likeElement = evt.currentTarget;
  likeElement.classList.toggle('elements__like-btn_active');
};

//Функция для удаления места
function deleteElement(evt) {
  const deleteElement = evt.currentTarget.closest('.elements__item');
  deleteElement.remove();
}*/

//Функция для просмотра места
/*function viewImageElement(evt) {
  openPopup(popupViewImageElement);
  imageLink.src = evt.target.src;
  imageLink.alt = evt.target.alt;
  imageName.textContent = evt.target.alt;
} */

//Функция для просмотра места НОВАЯ
function viewImageElement(name, link) {
  openPopup(popupViewImageElement);
  imageName.textContent = name;
  imageLink.alt = name;
  imageLink.src = link;
} 

/*/Функция создания нового места
function createElement(element) {
  const itemElement = elementTemplate.cloneNode(true);
  const elementImage = itemElement.querySelector('.elements__item-image');
  elementImage.alt = element.name;
  elementImage.src = element.link;
  itemElement.querySelector('.elements__item-name').textContent = element.name;
  
  itemElement.querySelector('.elements__like-btn').addEventListener('click', likeElement);
  itemElement.querySelector('.elements__trash-btn').addEventListener('click', deleteElement);
  elementImage.addEventListener('click', viewImageElement);
  
  return itemElement;
};*/

class Card {
  constructor(cardData, cardSelector, viewImageElement) {
    this._name = cardData.name;
    this._link = cardData.link;

    this._cardSelector = cardSelector;
    this._cardElement = this._getTemplate();

    this._cardName = this._cardElement.querySelector('.elements__item-name');
    this._cardImage = this._cardElement.querySelector('.elements__item-image');
    this._likeCard  = this._cardElement.querySelector('.elements__like-btn');
    this._deleteCard = this._cardElement.querySelector('.elements__trash-btn');

    this._viewImageElement = viewImageElement;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._likeCard.addEventListener('click', () => {
      this._likeCard.classList.toggle('elements__like-btn_active');
    });

    this._deleteCard.addEventListener('click', () => {
      this._cardElement.remove();
    });

    this._cardImage.addEventListener('click', () => {
      this._viewImageElement(this._name, this._link);
    })
  }

  createElement() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardName.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}

function createCard(cardData) {
  const cardElement = new Card(cardData, '#element-template', viewImageElement);
  return cardElement.createElement();
}

function renderElement(element) {
  elementsList.prepend(createCard(element));
}

//Добавление массива на страницу
initialElements.reverse().forEach(renderElement);

//Функция сохранения в карандаше
function saveUserProfile (evt) {
  evt.preventDefault(); 
  userName.textContent = nameUserInput.value;
  userBio.textContent = bioUserInput.value;
  closePopup(popupEditUser);
}

//Функция деактивации сабмита
function disabledSubmitBtn(popup) {
  const btnBtn = popup.querySelector('.popup__submit-btn');
  btnBtn.classList.add('popup__submit-btn_inactive');
  btnBtn.disabled = "disabled";
}

//Функция добавления в +
function addElement(evt) {
  evt.preventDefault();
  const element = {};
  element.name = nameImageInput.value;
  element.alt = nameImageInput.value;
  element.link = linkImageInput.value;
  renderElement(element);
  evt.target.reset();
  closePopup(popupAddElement);
  disabledSubmitBtn(popupAddElement);
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