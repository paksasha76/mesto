import "../pages/index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PicturePopup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import { Api } from '../components/Api.js';

const buttonEdit = document.querySelector(".profile__edit-btn");

const buttonAdd = document.querySelector(".profile__add-btn");

const formsEditProfile = document.forms["profile-info"];

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-btn",
  inactiveButtonClass: "popup__save-btn-disabled",
  inputErrorClass: "form__error-line",
  errorClass: "form__error-message_active",
};


const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
      authorization: '39748c5f-0d2d-4234-9c59-98ecf4137a9d',
      'Content-Type': 'application/json'
  }
});

const cardsSection = new Section(
  {
    renderer: addNewCard,
  },
  ".cards"
);


Promise.all([api.getInitialCards()])
.then(([cards]) => {
    const cardsSection = new Section ({
      items: cards,
      renderer: (items) => {
        addNewCard(items);
      }
     }, ".cards");
     cardsSection.renderItems()
})
.catch((err) => {
    console.log(err);
})

const popupEdit = new PopupWithForm(".popup-edit", submitNewUserData);
const popupZoom = new PopupWithImage(".popup-zoom");
const popupAdd = new PopupWithForm(".popup-add", submitNewCardForm);


const addNewCard = function (cardItem) {
  const card = createCard(
    cardItem.link,
    cardItem.name,
    "#card",
    handleCardClick
  );
  cardsSection.addCard(card);
};

const createCard = function (link, name, templateSelector, handleCardView) {
  const card = new Card(link, name, templateSelector, handleCardView);
  return card.generateCard();
};

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__job",
});

function submitNewUserData(data) {
  userInfo.setUserInfo(data);
  popupEdit.close();
}

buttonEdit.addEventListener("click", () => {
  popupEdit.open();
  const { name, about } = userInfo.getUserInfo();
  formsEditProfile.name.value = name;
  formsEditProfile.about.value = about;
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
  popupAdd.open();
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
  popupZoom.open(link, name);
}

popupZoom.setEventListener();
popupEdit.setEventListener();
popupAdd.setEventListener();
