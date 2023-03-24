import FormValidator from "./FormValidator.js";
import Card from "./Card.js";

const buttonEdit = document.querySelector(".profile__edit-btn");
const profileForm = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

const buttonAdd = document.querySelector(".profile__add-btn");
const popupAdd = document.querySelector(".popup-add");
const popupFormAdd = document.querySelector(".popup__form-add");
const nameInputCard = document.querySelector(".popup__input_type_card-name");
const linkInputCard = document.querySelector(".popup__input_type_card-link");
const popupEdit = document.querySelector(".popup-edit");

const profileCloseButton = document.querySelector(".popup__close-btn");
const buttonCloseAdd = document.querySelector(".popup__close-btn-add");

const cardsContainer = document.querySelector(".cards");

const popupZoom = document.querySelector(".popup-zoom");
const buttonCloseZoom = document.querySelector(".popup-zoom__close-btn");

const buttonCreate = document.querySelector(".popup__save-btn-create");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-btn",
  inactiveButtonClass: "popup__save-btn-disabled",
  inputErrorClass: "form__error-line",
  errorClass: "form__error-message_active",
};

const initialCards = [
  {
    name: "Токио",
    link: "https://preview.redd.it/5nxgafq6c9d71.jpg?auto=webp&s=4a5ad8cf9c7bf372897f570eb0fdca2b2ba52ea6",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const closePopupEsc = (evt) => {
  if (evt.key === "Escape") {
    evt.preventDefault();
    const popupOpened = document.querySelector(".popup_opened");
    closePopUp(popupOpened);
  }
};

const bindOverlayClickListener = (evt) => {
  if (evt.target.classList.contains("popup_opened")) {
    closePopUp(evt.target);
  }
};

const openPopUp = function (popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
};

const closePopUp = function (popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
};

const saveProfile = function () {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  profileForm.reset();
  closePopUp(popupEdit);
};

const saveElement = function () {
  cardsContainer.prepend(
    createCard(nameInputCard.value, linkInputCard.value, "#card")
  );
  closePopUp(popupAdd);
};

const createCard = function (link, name, templateSelector) {
  const card = new Card(link, name, templateSelector);

  return card.generateCard();
};

popupEdit.addEventListener("mousedown", bindOverlayClickListener);

popupAdd.addEventListener("mousedown", bindOverlayClickListener);

popupZoom.addEventListener("mousedown", bindOverlayClickListener);

buttonEdit.addEventListener("click", (eventOpen) => {
  openPopUp(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});
buttonAdd.addEventListener("click", (eventOpen) => {
  openPopUp(popupAdd);
  popupFormAdd.reset();
});

profileCloseButton.addEventListener("click", () => {
  closePopUp(popupEdit);
});

buttonCloseAdd.addEventListener("click", () => {
  closePopUp(popupAdd);
});

buttonCloseZoom.addEventListener("click", () => {
  closePopUp(popupZoom);
});

function toggleSubmitNewButton() {
  if (nameInputCard.value.length === 0 || linkInputCard.value.length === 0) {
    buttonCreate.disabled = true;
    buttonCreate.classList.add("popup__save-btn-disabled");
  }
}

profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveProfile();
  profileForm.reset();
});

popupFormAdd.addEventListener("submit", (event) => {
  event.preventDefault();
  saveElement();
  popupFormAdd.reset();
  toggleSubmitNewButton()
});

initialCards.forEach(function (card) {
  cardsContainer.append(createCard(card.link, card.name, "#card"));
});

const profileFormValidate = new FormValidator(
  validationConfig,
  document.querySelector(".popup__form-edit")
);

profileFormValidate.enablevalidation();

const cardFormValidate = new FormValidator(
  validationConfig,
  document.querySelector(".popup__form-add")
);

cardFormValidate.enablevalidation();

export { openPopUp };
