import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupZoomImage =
      this.popupSelector.querySelector(".popup-zoom__image");
    this._popupZoomText = this.popupSelector.querySelector(".popup-zoom__text");
  }
  open(title, link) {
    this._popupZoomImage.src = link;
    this._popupZoomImage.alt = title;
    this._popupZoomText.textContent = title;
    super.open();
  }
}
