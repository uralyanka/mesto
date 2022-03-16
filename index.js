let editUserButton = document.querySelector('.profile__user-edit-button');
let closeEditUserButton = document.querySelector('.popup__close-btn');
let popupEditUser = document.querySelector('.popup_user-edit');

let formElement = document.querySelector('.popup__form_user-edit');
let nameInput = document.querySelector('.popup__input_type_user-name');
let bioInput = document.querySelector('.popup__input_type_user-bio');

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

editUserButton.addEventListener('click', onPopup);
closeEditUserButton.addEventListener('click', offPopup);

function formSubmitHandler (evt) {
    evt.preventDefault(); 

    userName.textContent = nameInput.value;
    userBio.textContent = bioInput.value;
    
    offPopup ();
}

formElement.addEventListener('submit', formSubmitHandler); 