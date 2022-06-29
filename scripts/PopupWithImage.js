import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._popupImage = this._popup.querySelector('.popup__figure-image');
        this._popupCaption = this._popup.querySelector('.popup__figure-caption');
    }

    openPopup(text, link) {

        this._popupImage.src = link
        this._popupImage.alt = text
        this._popupCaption.textContent = text

       super.openPopup()
    }
}
