const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-btn",
  inactiveButtonClass: "popup__save-btn-disabled",
  inputErrorClass: "form__error-line",
  errorClass: "form__error-message_active",
};

function showInputError(formElement, inputElement, error, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.classList.add(validationConfig.errorClass);
  errorElement.textContent = error;
}

function hideInputError(formElement, inputElement, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
}

function checkInputValidity(formElement, inputElement, validationConfig) {
  if (inputElement.validity.valid === true) {
    hideInputError(formElement, inputElement, validationConfig);
  } else {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  }
}

function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  toggleSubmitButton(inputList, buttonElement, validationConfig);

  inputList.map(function (inputElement) {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleSubmitButton(inputList, buttonElement, validationConfig);
    });
  });
}

function hasInvalidInput(inputList) {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
}

function toggleSubmitButton(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
}

function enablevalidationConfig(validationConfig) {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.map(function (formElement) {
    setEventListeners(formElement, validationConfig);
  });
}

enablevalidationConfig(validationConfig);
