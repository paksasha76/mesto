import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PicturePopup.js";
import PopupWithForm from "../components/PopupWithForm.js";

const buttonEdit = document.querySelector(".profile__edit-btn");
const profileForm = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

const buttonAdd = document.querySelector(".profile__add-btn");
const popupFormAdd = document.querySelector(".popup__form-add");
const nameInputCard = document.querySelector(".popup__input_type_card-name");
const linkInputCard = document.querySelector(".popup__input_type_card-link");
const popupEdit = document.querySelector(".popup-edit");

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

const imagePopup = new PopupWithImage(".popup-zoom");
const popupProfile = new PopupWithForm(".popup-edit", submitNewUserData);
const popupNewCard = new PopupWithForm(".popup-add", submitNewCardForm);

const addNewCard = function (cardItem) {
  const card = createCard(
    cardItem.link,
    cardItem.name,
    "#card",
    handleCardClick
  );
  cardsSection.addItem(card);
};

const createCard = function (link, name, templateSelector, func) {
  const card = new Card(link, name, templateSelector, func);
  return card.generateCard();
};

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__job",
});

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: addNewCard,
  },
  ".cards"
);

cardsSection.renderItems();

function submitNewUserData(data) {
  userInfo.setUserInfo(data);
  popupProfile.close();
}

const handleProfileFormSubmit = function () {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  profileForm.reset();
  closePopup(popupEdit);
};

buttonEdit.addEventListener("click", () => {
  popupProfile.open();
  const { name, job } = userInfo.getUserInfo();
  nameInputCard.value = name;
  linkInputCard.value = job;
  profileFormValidate.disableSubmitButton();
});

buttonAdd.addEventListener("click", () => {
  popupNewCard.open();
  profileFormValidate.disableSubmitButton();
});

profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleProfileFormSubmit();
  profileForm.reset();
});

popupFormAdd.addEventListener("submit", (event) => {
  event.preventDefault();
  addNewCard();
  popupFormAdd.reset();
  cardFormValidate.toggleSubmitButton();
});

function submitNewCardForm(cardItem) {
  const newCard = createCard(
    cardItem.link,
    cardItem.name,
    "#card",
    handleCardClick
  );
  cardsSection.addCard(newCard);
}

buttonCreate.addEventListener("click", () => {
  popupNewCard.open();
  cardFormValidate.disableSubmitButton();
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

function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

imagePopup.setEventListener();
popupProfile.setEventListener();
popupNewCard.setEventListener();
