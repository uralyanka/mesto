/*ДОБАВИТЬ МАССИВ*/

const elementsList = document.querySelector('.elements__items');
const mestoTemplate = document.querySelector('#mesto-template').content;

const initialCards = [
  {
    name: 'Луна',
    link: 'https://cdn.pixabay.com/photo/2018/02/12/21/03/planet-3149121_960_720.jpg',
    alt: 'Лунная Луна'
  },
  {
    name: 'Моя планета Мелмак',
    link: 'https://avatars.mds.yandex.net/get-zen_doc/1821029/pub_5eafa60434cbba0565c6b3f2_5eafdcae0ab5b766d08574d5/scale_1200',
    alt: 'Мелмаковый Мелмак'
  },
  {
    name: 'Планета Венера',
    link: 'https://cdn.pixabay.com/photo/2016/04/25/01/30/venus-1351056_960_720.png',
    alt: 'Венерная Венера'
  },
  {
    name: 'Планета Марс',
    link: 'https://cdn.pixabay.com/photo/2017/02/09/12/02/mars-2051747_960_720.png',
    alt: 'Марсовый Марс'
  },
  {
    name: 'Меркурий',
    link: 'https://cdn.pixabay.com/photo/2020/09/08/23/58/mercury-5556108_960_720.jpg',
    alt: 'Меркурьевий Меркурий'
  },
  {
    name: 'Юпитер',
    link: 'https://cdn.pixabay.com/photo/2012/01/09/10/41/space-probe-11616_960_720.jpg',
    alt: 'Юпитерный Юпитер'
  }
];
  
initialCards.forEach(function (element) {
  const mestoElement = mestoTemplate.cloneNode(true);
    mestoElement.querySelector('.elements__item-image').src = element.link;
    mestoElement.querySelector('.elements__item-image').alt = element.alt;
    mestoElement.querySelector('.elements__item-name').textContent = element.name;
       
    elementsList.append(mestoElement)
});

/*Функция открытия попапов*/
function popupOpen(popup) {
  popup.classList.add('popup_opened');
}

/*Функция закрытия попапов*/
function popupClose(popup) {
  popup.classList.remove('popup_opened');
}

/*КНОПКА КАРАНДАШ*/
let editUserButton = document.querySelector('.profile__user-edit-button');
let closeEditUserButton = document.querySelector('.popup__close-btn_type_user-edit');

let popupEditUser = document.querySelector('.popup_type_user-edit');
let formElement = popupEditUser.querySelector('.popup__form_type_user-edit');

let nameInput = formElement.querySelector('.popup__input_type_user-name');
let bioInput = formElement.querySelector('.popup__input_type_user-bio');

let userName = document.querySelector('.profile__user-name');
let userBio = document.querySelector('.profile__user-bio');

function onPopupEdit() {
  popupOpen(popupEditUser);
  nameInput.value = userName.innerText;
  bioInput.value = userBio.innerText;
}

function offPopupEdit() {
  popupClose(popupEditUser);
  nameInput.value = '';
  bioInput.value = '';
} 

/*КНОПКА СОХРАНИТЬ В КАРАНДАШЕ*/
function formSubmitHandler (evt) {
    evt.preventDefault(); 

    userName.textContent = nameInput.value;
    userBio.textContent = bioInput.value;
    
    offPopupEdit ();
}

editUserButton.addEventListener('click', onPopupEdit);
closeEditUserButton.addEventListener('click', offPopupEdit);
formElement.addEventListener('submit', formSubmitHandler); 


/*КНОПКА ЛАЙК*/
const likeMesto = Array.from(document.querySelectorAll('.elements__item-like'));
likeMesto.forEach((button) => {
  btnLikeListener(button);
});

function btnLikeListener(button) {
  button.addEventListener('click', () => {
    button.classList.toggle('elements__item-like_active');
  });
}
/*
document.querySelector('.elements__item-like').addEventListener('click', function (evt) {
  evt.target.classList.toggle('elements__item-like_active')
*/

/*КНОПКА УДАЛИТЬ*/
const deleteMesto = Array.from(document.querySelectorAll('.elements__trash-btn'));
deleteMesto.forEach((button) => {
  btnDeleteListener(button)
});

function btnDeleteListener(button) {
  button.addEventListener('click', () => {
    const listItem = button.closest('.elements__item');
    listItem.remove();
  });
}

/*КНОПКА +*/
let addMestoButton = document.querySelector('.profile__add-button');
let closeAddMestoButton = document.querySelector('.popup__close-btn_type_add-mesto');

let popupAddMesto = document.querySelector('.popup_type_add-mesto');
let formElementAdd = document.querySelector('.popup__form_type_add-mesto');

let mestoInput = formElementAdd.querySelector('.popup__input_type_mesto-name');
let linkInput = formElementAdd.querySelector('.popup__input_type_mesto-link');

function onPopupMesto() {
  popupOpen(popupAddMesto);
  mestoInput.value = '';
  linkInput.value = '';
}

function offPopupMesto() {
  popupClose(popupAddMesto);
  mestoInput.value = '';
  linkInput.value = '';
}

/*КНОПКА СОЗДАТЬ В +*/
function addMesto(evt) {
  evt.preventDefault();
  const mestoTemplate = document.querySelector('#mesto-template').content;
  const mestoElement = mestoTemplate.querySelector('.elements__item').cloneNode(true);

  mestoElement.querySelector('.elements__item-name').textContent = mestoInput.value;
  mestoElement.querySelector('.elements__item-image').src = linkInput.value;
  const likeBtn = mestoElement.querySelector('.elements__item-like');
  const deleteBtn = mestoElement.querySelector('.elements__trash-btn');
  const imageViewBtn = mestoElement.querySelector('.elements__item-image');
  elementsList.prepend(mestoElement);
  btnLikeListener(likeBtn);
  btnDeleteListener(deleteBtn);
  btnItemImageListener(imageViewBtn);
  offPopupMesto();
}

addMestoButton.addEventListener('click', onPopupMesto);
closeAddMestoButton.addEventListener('click', offPopupMesto);
formElementAdd.addEventListener('submit', addMesto); 

/*УВЕЛИЧЕНИЕ КАРТИНКИ*/
const popupImageMesto = document.querySelector('.popup_type_image-mesto');
const imageLink = document.querySelector('.popup__figure-image');
const imageImage = document.querySelector('.popup__figure-caption');

const itemsImage = Array.from(document.querySelectorAll('.elements__item-image'));
itemsImage.forEach((button) => {
  btnItemImageListener(button)
});

function btnItemImageListener(button) {
  button.addEventListener('click', function (evt) {
    popupOpen(popupImageMesto);
    imageLink.src = evt.target.src;
    imageLink.alt = evt.target.alt;
    imageImage.textContent = document.querySelector('.elements__item-name').textContent;
  });
}

const closeImageMestoButton = document.querySelector('.popup__close-btn_type_image-mesto');

function offPopupImageMesto() {
  popupClose(popupImageMesto);
} 

closeImageMestoButton.addEventListener('click', offPopupImageMesto);




/*

const itemImageMesto = document.querySelector('.elements__item-image');
const popupImageMesto = document.querySelector('.popup_type_image-mesto');
const imageLink = document.querySelector('.popup__figure-image');
const imageImage = document.querySelector('.popup__figure-caption');

const closeImageMestoButton = document.querySelector('.popup__close-btn_type_image-mesto');

itemImageMesto.addEventListener('click', function (evt) {
  popupOpen(popupImageMesto);
  imageLink.src = evt.target.src;
  imageLink.alt = evt.target.alt;
  imageImage.textContent = document.querySelector('.elements__item-name').textContent;
});

function offPopupImageMesto() {
  popupClose(popupImageMesto);
} 

closeImageMestoButton.addEventListener('click', offPopupImageMesto);

/*
let itemImageMesto = document.querySelector('.elements__item-image');
let closeImageMestoButton = document.querySelector('.popup__close-btn_type_image-mesto');
let popupImageMesto = document.querySelector('.popup_type_image-mesto');

let imageMesto = document.querySelector('.elements__item-image');

function onPopupMesto() {
  popupOpen(popupImageMesto);
  imageMesto.src = evt.target.src;
  imageMesto.alt = evt.target.alt;
  imageMesto.name = evt.target.name;
}

function offPopupMesto() {
  popupClose(popupImageMesto);
}

itemImageMesto.addEventListener('click', onPopupMesto);
closeImageMestoButton.addEventListener('click', offPopupMesto);


/*
const deleteMesto = Array.from(document.querySelectorAll('.elements__trash-btn'));
deleteMesto.forEach((button, index) => {
    button.addEventListener('click', () => {
      const listItem = button.closest('.elements__item');
      listItem.remove();
    });
  }); 
*/

/*
const likeMesto = Array.from(document.querySelectorAll('.elements__item-like'));
likeMesto.forEach((button, index) => {
    button.addEventListener('click', () => {
      button.classList.toggle('elements__item-like_active');
    });
  }); 
*/

