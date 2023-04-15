export default class Card {
  constructor(link, name, templateSelector, handleCardView) {
    this._link = link;
    this._name = name;
    this._templateSelector = templateSelector;
    this._handleCardView = handleCardView;
  }

  _getTemplate() {
    const cardClone = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardClone;
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(".card__img");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector(".card__title").textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }

  _handleButtonLikeClick() {
    this._buttonLike.classList.toggle("card__btn_like-active");
  }

  _handleButtonDeleteClick() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setEventListeners() {
    this._buttonDelete = this._cardElement.querySelector(".card__btn-delete");
    this._buttonLike = this._cardElement.querySelector(".card__btn-like");
    this._popupImage = document.querySelector(".popup-zoom");
    this._itemImage = this._popupImage.querySelector(".popup-zoom__image");
    this._popupText = this._popupImage.querySelector(".popup-zoom__text");
    this._itemImage.src = this._link;
    this._itemImage.alt = this._name;
    this._popupText.textContent = this._name;

    this._buttonDelete.addEventListener("click", () => {
      this._handleButtonDeleteClick();
    });

    this._buttonLike.addEventListener("click", () => {
      this._handleButtonLikeClick();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardView(this._name, this._link)
    });
  }
}