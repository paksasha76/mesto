import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
	constructor(popup, submitCallBack) {
		super(popup);
		this._submitCallBack  = submitCallBack;
		this._form = this.popupSelector.querySelector('.popup__form');
		this._inputList = this._form.querySelectorAll('.popup__input');
	}

	close() {
		super.close();
		this._form.reset();
	}

	_getInputValues() {
		this._inputsValues = {};
		this._inputList.forEach((input) => {
			this._inputsValues[input.name] = input.value;
		});
		return this._inputsValues;
	}

	setEventListener() {
		super.setEventListener();

		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._submitCallBack(this._getInputValues());
			this.close();
		})
	}
}
