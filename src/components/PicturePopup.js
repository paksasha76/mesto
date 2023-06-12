import { Popup } from "./Popup.js";

export default class PicturePopup extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupZoomImage = this._popup.querySelector(".popup__zoom-image");
    this._popupZoomText = this._popup.querySelector(".popup__zoom-title");
  }

  open(title, link) {
    this._popupZoomImage.src = link;
    this._popupZoomImage.alt = title;
    this._popupZoomText.textContent = title;
    super.open();
  }
}
