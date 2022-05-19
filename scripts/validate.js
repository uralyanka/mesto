//ВАЛИДАЦИЯ
const formData = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

const findErrorElement = (formElement, inputElement) => {
    return formElement.querySelector(`#error-${inputElement.id}`);
};

const showInputError = (formElement, inputElement, errorMessage, object) => {
    const errorElement = findErrorElement(formElement, inputElement);
    inputElement.classList.add(object.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(object.errorClass);
  };
  
  const hideInputError = (formElement, inputElement, object) => {
    const errorElement = findErrorElement(formElement, inputElement);
    inputElement.classList.remove(object.inputErrorClass);
    errorElement.classList.remove(object.errorClass);
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (formElement, inputElement, object) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, object);
    } else {
      hideInputError(formElement, inputElement, object);
    }
  };
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 
  
  const toggleButtonState = (inputList, buttonElement, object) => {
  
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(object.inactiveButtonClass);
      buttonElement.disabled = "disabled";
    } else {
      buttonElement.classList.remove(object.inactiveButtonClass);
      buttonElement.disabled = "";
    }
  }; 
  
  const setEventListeners = (formElement, object) => {
    const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
    const buttonElement = formElement.querySelector(object.submitButtonSelector);
    
    toggleButtonState(inputList, buttonElement, object);
    
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, object);
        
        toggleButtonState(inputList, buttonElement, object);
      });
    });
  };
  
  const enableValidation = (object) => {
    const formList = Array.from(document.querySelectorAll(object.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      });
      setEventListeners(formElement, object);
      });
    };
    
    enableValidation(formData);
