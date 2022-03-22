let editUserButton = document.querySelector('.profile__user-edit-button');
let closeEditUserButton = document.querySelector('.popup__close-btn');

let popupEditUser = document.querySelector('.popup_user-edit');
let formElement = popupEditUser.querySelector('.popup__form');

let nameInput = formElement.querySelector('#user-name');
let bioInput = formElement.querySelector('#user-bio');

let userName = document.querySelector('.profile__user-name');
let userBio = document.querySelector('.profile__user-bio');

function onPopup() {
    popupEditUser.classList.add('popup_opened');
    nameInput.value = userName.innerText;
    bioInput.value = userBio.innerText;
}

function offPopup() {
    popupEditUser.classList.remove('popup_opened');
    nameInput.value = '';
    bioInput.value = '';
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 

    userName.textContent = nameInput.value;
    userBio.textContent = bioInput.value;
    
    offPopup ();
}

editUserButton.addEventListener('click', onPopup);
closeEditUserButton.addEventListener('click', offPopup);

formElement.addEventListener('submit', formSubmitHandler); 