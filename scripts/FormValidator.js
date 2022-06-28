export default class FormValidator {
  constructor(formData, formElement) {
    this._formData = formData;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._formData.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._formData.submitButtonSelector);
  }

  _findErrorElement(inputElement){
    return this._formElement.querySelector(`#error-${inputElement.id}`);
  };

  _showInputError(inputElement) {
      const errorElement = this._findErrorElement(inputElement);
      inputElement.classList.add(this._formData.inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(this._formData.errorClass);
  };
  
  _hideInputError(inputElement){
    const errorElement = this._findErrorElement(inputElement);
    inputElement.classList.remove(this._formData.inputErrorClass);
    errorElement.classList.remove(this._formData.errorClass);
    errorElement.textContent = '';
  };
  
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };
  
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 
  
  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._formData.inactiveButtonClass);
      this._buttonElement.disabled = "disabled";
    } else {
      this._buttonElement.classList.remove(this._formData.inactiveButtonClass);
      this._buttonElement.disabled = "";
    }
  }; 
  
  _setEventListeners() {
    this.toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  };

  resetValidation() {
    this.toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
  
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }
}