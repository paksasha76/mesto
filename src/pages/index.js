import '../pages/index.css';
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PicturePopup.js";
import PopupWithForm from "../components/PopupWithForm.js";

const buttonEdit = document.querySelector(".profile__edit-btn");

const buttonAdd = document.querySelector(".profile__add-btn");

const formsEditProfile = document.forms['profile-info'];


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
  nameSelector: '.profile__name', 
  aboutSelector: '.profile__job',
});

function submitNewUserData(data) {
  userInfo.setUserInfo(data);
  popupProfile.close();
}

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: addNewCard,
  },
  ".cards"
);

cardsSection.renderItems();

buttonEdit.addEventListener('click', () => {
  popupProfile.open();
  const {name, about} = userInfo.getUserInfo();
  formsEditProfile.name.value = name;
  formsEditProfile.about.value = about;
  profileFormValidate.disableSubmitButton();
});

buttonAdd.addEventListener("click", () => {
  popupNewCard.open();
  profileFormValidate.disableSubmitButton();
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

buttonAdd.addEventListener("click", () => {
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

function handleCardClick(link, name) {
  imagePopup.open(link, name);
}

imagePopup.setEventListener();
popupProfile.setEventListener();
popupNewCard.setEventListener();
