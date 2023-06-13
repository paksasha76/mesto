import "./index.css";

import {
  validationConfig,
  popupName,
  popupJob,
  formPopupProfileEdit,
  formPopupAddPlace,
  formPopupAvatarEdit,
  buttonOpenPopupProfileEdit,
  buttonOpenPopupAddPlace,
  buttonOpenPopupAvatarEdit,
} from "../utils/constants.js";

import Card  from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo  from "../components/UserInfo.js";
import Section  from "../components/Section.js";
import PopupWithForm  from "../components/PopupWithForm.js";
import PopupConfirm  from "../components/PopupConfirm.js";
import PicturePopup  from "../components/PicturePopup.js";
import Api from "../components/Api.js";

let userId;

const api = new Api({
  url: "https://nomoreparties.co/v1/cohort-68",
  headers: {
    authorization: "39748c5f-0d2d-4234-9c59-98ecf4137a9d",
    "Content-Type": "application/json",
  },
});

function createCard(data) {
  const newCard = new Card(
    data,
    "#place-template",
    userId,
    handleCardClick,
    deleteCardLike,
    addCardLike,
    handleDeleteClick
  );
  const cardElement = newCard.generateCard();
  return cardElement;
}

const cardSection = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addCard(cardElement);
    },
  },
  ".cards__list"
);

const userInfo = new UserInfo(validationConfig);

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([user, cards]) => {
    userId = user._id;
    userInfo.setUserInfo(user);
    userInfo.setAvatar(user);
    cardSection.renderer(cards);
  })
  .catch((err) => {
    console.log(err);
  });

function openPopupProfileEdit() {
  popupProfileEdit.open();
  const userInfoList = userInfo.getUserInfo();
  popupName.value = userInfoList.name;
  popupJob.value = userInfoList.profession;
  validFormPopupProfileEdit.resetErrorElement();
}

function openPopupAddPlace() {
  popupAddPlace.open();
  validFormPopupAddPlace.toggleSubmitButton();
  validFormPopupAddPlace.resetErrorElement();
}

function openPopupEditAvatar() {
  popupAvatarEdit.open();
  validFormPopupEditAvatar.toggleSubmitButton();
  validFormPopupEditAvatar.resetErrorElement();
}

function submitFormPopupProfileEdit(formValues) {
  popupProfileEdit.waitSubmitButton(true);
  api
    .editUserInfo({ name: formValues.name, profession: formValues.profession })
    .then((res) => {
      userInfo.setUserInfo(res);
      popupProfileEdit.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupProfileEdit.waitSubmitButton(false);
    });
}

function submitFormPopupAddPlace(formValues) {
  popupAddPlace.waitSubmitButton(true);
  api
    .addCard({ name: formValues.name, link: formValues.link })
    .then((res) => {
      const cardElement = createCard(res);
      cardSection.addItem(cardElement);
      popupAddPlace.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAddPlace.waitSubmitButton(false);
    });
}

function submitFormPopupEditAvatar(formValues) {
  popupAvatarEdit.waitSubmitButton(true);
  api
    .editAvatarUser({ avatar: formValues.avatar })
    .then((res) => {
      userInfo.setAvatar(res);
      popupAvatarEdit.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvatarEdit.waitSubmitButton(false);
    });
}

function submitPopupConfirm(card) {
  popupConfirm.waitSubmitButton(true);
  api
    .deleteCard(card._id)
    .then((res) => {
      card.removeCard(res);
      popupConfirm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupConfirm.waitSubmitButton(false);
    });
}

function handleCardClick(title, link) {
  popupImage.open(title, link);
}

function handleDeleteClick(card) {
  popupConfirm.open(card);
}

const deleteCardLike = (id, renderLike) => {
  api
    .deleteCardLike(id)
    .then((res) => {
      renderLike(res.likes);
    })
    .catch((err) => {
      console.log(err);
    });
};

const addCardLike = (id, renderLike) => {
  api
    .addCardLike(id)
    .then((res) => {
      renderLike(res.likes);
    })
    .catch((err) => {
      console.log(err);
    });
};

const popupProfileEdit = new PopupWithForm(
  submitFormPopupProfileEdit,
  ".popup_type_edit"
);
popupProfileEdit.setEventListeners();

const popupAddPlace = new PopupWithForm(
  submitFormPopupAddPlace,
  ".popup_type_add"
);
popupAddPlace.setEventListeners();

const popupAvatarEdit = new PopupWithForm(
  submitFormPopupEditAvatar,
  ".popup_type_avatar"
);
popupAvatarEdit.setEventListeners();

const popupImage = new PicturePopup(".popup_type_view");
popupImage.setEventListeners();

const popupConfirm = new PopupConfirm(
  submitPopupConfirm,
  ".popup_type_confirm"
);
popupConfirm.setEventListeners();

const validFormPopupProfileEdit = new FormValidator(
  validationConfig,
  formPopupProfileEdit
);
validFormPopupProfileEdit.enableValidation();

const validFormPopupAddPlace = new FormValidator(validationConfig, formPopupAddPlace);
validFormPopupAddPlace.enableValidation();

const validFormPopupEditAvatar = new FormValidator(validationConfig, formPopupAvatarEdit);
validFormPopupEditAvatar.enableValidation();

buttonOpenPopupProfileEdit.addEventListener("mousedown", openPopupProfileEdit);

buttonOpenPopupAddPlace.addEventListener("mousedown", openPopupAddPlace);

buttonOpenPopupAvatarEdit.addEventListener("mousedown", openPopupEditAvatar);
