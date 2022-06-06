export default class Card {
  constructor(cardData, cardSelector, viewImageElement) {
    this._name = cardData.name;
    this._link = cardData.link;

    this._cardSelector = cardSelector;
    this._cardElement = this._getTemplate();

    this._cardName = this._cardElement.querySelector('.elements__item-name');
    this._cardImage = this._cardElement.querySelector('.elements__item-image');
    this._likeCard  = this._cardElement.querySelector('.elements__like-btn');
    this._deleteCard = this._cardElement.querySelector('.elements__trash-btn');

    this._viewImageElement = viewImageElement;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._likeCard.addEventListener('click', () => {
      this._likeCard.classList.toggle('elements__like-btn_active');
    });

    this._deleteCard.addEventListener('click', () => {
      this._cardElement.remove();
    });

    this._cardImage.addEventListener('click', () => {
      this._viewImageElement(this._name, this._link);
    })
  }

  createCard() {
    this._cardImage.alt = this._name;
    this._cardName.textContent = this._name;
    this._cardImage.src = this._link;

    this._setEventListeners();

    return this._cardElement;
  }
}