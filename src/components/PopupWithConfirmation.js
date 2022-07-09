import Popup from '../components/Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._formElement = this._popup.querySelector('.form');
    };

    setSubmitAction(action) {
        this._clickSubmit = action;
    };

    setEventListeners() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._clickSubmit();
        });

        super.setEventListeners();
    }
}