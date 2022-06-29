import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    openPopup(text, link) {
       const image = this._popup.querySelector('.popup__figure-image');
       const caption = this._popup.querySelector('.popup__figure-caption');

       image.src = link
       caption.textContent = text

       super.openPopup()
    }
}
