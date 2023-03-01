const validation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn-disabled',
  inputErrorClass: 'form__error-line',
  errorClass: 'form__error-message_active'
}

function showInputError (formElement, inputElement, error, validation) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
  inputElement.classList.add(validation.inputErrorClass);
  errorElement.classList.add(validation.errorClass);
  errorElement.textContent = error;
}

function hideInputError (formElement, inputElement, validation) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validation.inputErrorClass);
  errorElement.classList.remove(validation.errorClass);
  errorElement.textContent = '';
}

function checkInputValidity (formElement, inputElement, validation) {
  if (inputElement.validity.valid === true) {
      hideInputError(formElement, inputElement, validation);
  } else {
      showInputError(formElement, inputElement, inputElement.validationMessage, validation);
  }
}

function setEventListeners (formElement, validation) {
  const input = Array.from(formElement.querySelectorAll(validation.inputSelector));
  const buttonElement = formElement.querySelector(validation.submitButtonSelector);
  required(input, buttonElement, validation); 

  input.map(function(inputElement) {  
      inputElement.addEventListener('input', function() { 
          checkInputValidity(formElement, inputElement, validation);
          required(input, buttonElement, validation);
      });
  });
};

function hasInvalidInput(input) {
  return input.some(function(inputElement) {
      return !(inputElement.validity.valid);
  })
}

function required (input, buttonElement, validation) {
  if (hasInvalidInput(input)) {
      buttonElement.classList.add(validation.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
  } 
  else {
      buttonElement.classList.remove(validation.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
  }
}

function enableValidation (validation) {
  const form = Array.from(document.querySelectorAll(validation.formSelector));
  form.map( function(formElement) {
      setEventListeners(formElement, validation);
  });
}

enableValidation(validation);