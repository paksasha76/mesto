export default class Popup {
  constructor(popupSelector) {
    this.popupSelector = document.querySelector(popupSelector);
    this._buttonClose = this.popupSelector.querySelector(".popup__close-btn");
  }
  open() {
    this.popupSelector.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    this.popupSelector.addEventListener("click", this._handleCloseOnClick);
  }
  close() {
    this.popupSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    this.popupSelector.removeEventListener("click", this._handleCloseOnClick);
  }
  _handleEscClose = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      this.close();
    }
  }
  _handleCloseOnClick = (event) => {
    if (event.target === this.popupSelector) {
      this.close();
    }
  };
  setEventListener() {
    this._buttonClose.addEventListener("click", () => this.close());
  }
}
