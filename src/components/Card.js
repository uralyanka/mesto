export default class Card {
  constructor(
    cardData,
    templateSelector,
    userId,

    handlePhotoClick,
    handleTrashButtonClick,
    handleLikeButtonClick) {
    
    this._cardData = cardData
    this._name = cardData.name
    this._link = cardData.link
    this._userId = userId
    this._ownerId = cardData.owner._id
    this._likes = cardData.likes

    this._templateSelector = templateSelector
    this._cardElement = this._getTemplate()

    this._cardName = this._cardElement.querySelector('.elements__item-name')
    this._cardImage = this._cardElement.querySelector('.elements__item-image')
    this._likeCard  = this._cardElement.querySelector('.elements__like-btn')
    this._deleteCard = this._cardElement.querySelector('.elements__trash-btn')
    this._likeCount = this._cardElement.querySelector('.elements__like-counter')

    this._handlePhotoClick = handlePhotoClick
    this._handleTrashButtonClick = handleTrashButtonClick
    this._handleLikeButtonClick  = handleLikeButtonClick 
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _isOwnerCard() {
    if (this._ownerId !== this._userId) {
      this._deleteCard.remove()
    }
  }

  isLiked = () => {
    return this._likes.some((liked) => liked._id == this._userId)
  }

  updateLikes(card) {
    this._likeCount.textContent = card.likes.length
    this._likes = card.likes
    this._likeCard.classList.toggle('elements__like-btn_active', this.isLiked())
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true)

    return cardElement;
  }

  _setEventListeners() {
    this._likeCard.addEventListener('click', () => {
      this._handleLikeButtonClick (this)
    })

    this._deleteCard.addEventListener('click', () => {
      this._handleTrashButtonClick(this._cardData)
    })

    this._cardImage.addEventListener('click', () => {
      this._handlePhotoClick(this._name, this._link)
    })
  }

  createCard() {
    this._cardImage.alt = this._name
    this._cardName.textContent = this._name
    this._cardImage.src = this._link
    this.updateLikes(this._cardData)
    this._likeCount.textContent = this._likes.length
    this._isOwnerCard()

    this._setEventListeners()
    return this._cardElement
  }
}