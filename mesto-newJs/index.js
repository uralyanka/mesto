const elementsList = document.querySelector('.elements__items');
const mestoTemplate = document.querySelector('#mesto-template').content;

const initialCards = [
  {
    name: 'Луна',
    link: 'https://cdn.pixabay.com/photo/2018/02/12/21/03/planet-3149121_960_720.jpg',
  },
  {
    name: 'Моя планета Мелмак',
    link: 'https://avatars.mds.yandex.net/get-zen_doc/1821029/pub_5eafa60434cbba0565c6b3f2_5eafdcae0ab5b766d08574d5/scale_1200',
  },
  {
    name: 'Планета Венера',
    link: 'https://cdn.pixabay.com/photo/2016/04/25/01/30/venus-1351056_960_720.png',
  },
  {
    name: 'Планета Марс',
    link: 'https://cdn.pixabay.com/photo/2017/02/09/12/02/mars-2051747_960_720.png',
  },
  {
    name: 'Меркурий',
    link: 'https://cdn.pixabay.com/photo/2020/09/08/23/58/mercury-5556108_960_720.jpg',
  },
  {
    name: 'Юпитер',
    link: 'https://cdn.pixabay.com/photo/2012/01/09/10/41/space-probe-11616_960_720.jpg',
  }
];

const popupViewMesto = document.querySelector('.popup_type_view-mesto');
const imageLink = document.querySelector('.popup__figure-image');
const imageImage = document.querySelector('.popup__figure-caption');
const closeViewMestoButton = document.querySelector('.popup__close-btn_type_view-mesto');

const editUserButton = document.querySelector('.profile__user-edit-button');
const closeEditUserButton = document.querySelector('.popup__close-btn_type_user-edit');
const popupEditUser = document.querySelector('.popup_type_user-edit');
const formElement = popupEditUser.querySelector('.popup__form_type_user-edit');
const nameInput = formElement.querySelector('.popup__input_type_user-name');
const bioInput = formElement.querySelector('.popup__input_type_user-bio');
const userName = document.querySelector('.profile__user-name');
const userBio = document.querySelector('.profile__user-bio');

const addMestoButton = document.querySelector('.profile__add-button');
const closeAddMestoButton = document.querySelector('.popup__close-btn_type_add-mesto');
const popupAddMesto = document.querySelector('.popup_type_add-mesto');
const formElementAdd = document.querySelector('.popup__form_type_add-mesto');
const mestoInput = formElementAdd.querySelector('.popup__input_type_mesto-name');
const linkInput = formElementAdd.querySelector('.popup__input_type_mesto-link');

//Функция открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//Функция закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//Функция для лайка
function likeMesto(evt) {
const likeMesto = evt.currentTarget;
likeMesto.classList.toggle('elements__item-like_active');
};

//Функция для удаления места
function deleteMesto(evt) {
  const itemMesto = evt.currentTarget.closest('.elements__item');
  itemMesto.remove();
}

//Функция для просмотра места
function viewMesto(evt) {
  openPopup(popupViewMesto);
  imageLink.src = evt.target.src;
  imageLink.alt = evt.target.alt;
  imageImage.textContent = evt.target.alt;
}

//Функция для конца просмотра места :D*/
function closeViewMesto () {
  closePopup(popupViewMesto);
};

//Функция создания нового места
function createElement(element) {
  const mestoElement = mestoTemplate.cloneNode(true);
  mestoElement.querySelector('.elements__item-image').src = element.link;
  mestoElement.querySelector('.elements__item-image').alt = element.name;
  mestoElement.querySelector('.elements__item-name').textContent = element.name;
  
  mestoElement.querySelector('.elements__item-like').addEventListener('click', likeMesto);
  mestoElement.querySelector('.elements__trash-btn').addEventListener('click', deleteMesto);
  mestoElement.querySelector('.elements__item-image').addEventListener('click', viewMesto);
  
  closeViewMestoButton.addEventListener('click', closeViewMesto);

  return mestoElement;
};

function renderElement(element) {
  elementsList.prepend(createElement(element));
}

initialCards.reverse().forEach(renderElement);

//КНОПКА КАРАНДАШ
editUserButton.addEventListener('click', function () {
  openPopup(popupEditUser);
  nameInput.value = userName.innerText;
  bioInput.value = userBio.innerText;
});

closeEditUserButton.addEventListener('click', function () {
  closePopup(popupEditUser);
  nameInput.value = '';
  bioInput.value = '';
});

//КНОПКА СОХРАНИТЬ В КАРАНДАШЕ
function formSubmitHandler (evt) {
    evt.preventDefault(); 

    userName.textContent = nameInput.value;
    userBio.textContent = bioInput.value;
    
    closePopup(popupEditUser);
}
formElement.addEventListener('submit', formSubmitHandler); 

//КНОПКА +
addMestoButton.addEventListener('click', function () {
  openPopup(popupAddMesto);
  mestoInput.value = '';
  linkInput.value = '';
});

closeAddMestoButton.addEventListener('click', function () {
  closePopup(popupAddMesto);
  mestoInput.value = '';
  linkInput.value = '';
});

//КНОПКА СОЗДАТЬ В +
function addMesto(evt) {
  evt.preventDefault();
  const element = {};
  element.name = mestoInput.value;
  element.alt = mestoInput.value;
  element.link = linkInput.value;
  renderElement(element);

  closePopup(popupAddMesto);
}

formElementAdd.addEventListener('submit', addMesto); 