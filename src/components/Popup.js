export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonClose = this._popup.querySelector(".popup__close-btn");
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    this._popup.addEventListener("click", this._handleCloseOnClick);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    this._popup.removeEventListener("click", this._handleCloseOnClick);
  }

  _handleEscClose = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      this.close();
    }
  };

  _handleCloseOnClick = (event) => {
    if (event.target === this._popup) {
      this.close();
    }
  };

  setEventListeners() {
    this._buttonClose.addEventListener("click", () => 
    this.close());
  }
}

