import { Popup } from "./Popup.js";

export default class PicturePopup extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(cardItem) {
    super.open();
    const popupZoomImage = this._popup.querySelector(".popup__zoom-image");
    const popupZoomText = this._popup.querySelector(".popup__zoom-title");

    const popupImage = cardItem.querySelector(".place__photo");
    const popupText = cardItem.querySelector(".place__title");

    popupZoomImage.src = popupImage.src;
    popupZoomImage.alt = popupImage.alt;
    popupZoomText.textContent = popupText.textContent;
  }
}
