import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector)

        this._handleFormSubmit = handleFormSubmit
        this._form = this._popup.querySelector('.popup__form')
        this._inputs = this._form.querySelectorAll('.popup__input')
        this._popupSubmitButton = this._form.querySelector('.popup__submit-btn')
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
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues())
        })
    }

    closePopup() {
       super.closePopup()
       this._form.reset()
    }

    //Пробовала разными способами передавать наиболее подходящий текст, 
    //но пока не нашла оптимального)) Думаю дальше - самой так не нравится.
    //СПАСИБО ЗА ВСЕ ЗАМЕЧАНИЯ И СОВЕТЫ ПО УЛУЧШЕНИЮ!
    renderLoading(isLoading) {
        if (isLoading) {
          this._popupSubmitButton.textContent = 'Сохранение...';
        } else {
          this._popupSubmitButton.textContent = 'Сохранить';
        }
      }
}