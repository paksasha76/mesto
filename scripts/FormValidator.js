export default class FormValidator {
  constructor(object, formElement) {
    this._formSelector = object.formSelector;
    this._inputSelector = object.inputSelector;
    this._submitButtonSelector = object.submitButtonSelector;
    this._inactiveButtonClass = object.inactiveButtonClass;
    this._inputErrorClass = object.inputErrorClass;
    this._errorClass = object.errorClass;
    this._formElement = formElement;
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this.toggleSubmitButton();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleSubmitButton();
      });
    });
  }

  toggleSubmitButton() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", true);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid === true) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  }

  _showInputError(inputElement, error) {
    this._errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = error;
    this._errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = "";
  }

  enablevalidation() {
    this._setEventListeners();
  }
}
