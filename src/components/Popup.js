export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closePopupByEsc = this._closePopupByEsc.bind(this);
    }
  
    _closePopupByEsc(evt) {
        if (evt.key === 'Escape') {
            this.closePopup()
        }
    }

    openPopup() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._closePopupByEsc);
    }

    closePopup() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._closePopupByEsc);
    }
    
    setEventListeners() {
        const closeButton = this._popup.querySelector('.popup__close-btn');
        
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened') || evt.target === closeButton) {
                this.closePopup()
            }
        })
    }
}