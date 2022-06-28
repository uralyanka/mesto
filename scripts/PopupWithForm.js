import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector)

        this._handleFormSubmit = handleFormSubmit
        this._form = this._popup.querySelector('.popup__form')
        this._inputs = this._form.querySelectorAll('.popup__input')
    }

    _getInputValues() {
        const values = {}
        this._inputs.forEach((input) => {
            values[input.name] = input.value
         })

         return values
    }

    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit', () => {
            this._handleFormSubmit(this._getInputValues())
        })
    }

    closePopup() {
       super.closePopup()
       this._form.reset()
    }
}