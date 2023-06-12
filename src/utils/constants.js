export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  profileNameSelector: ".profile__name",
  profileProfessionSelector: ".profile__profession",
  profileAvatarSelector: ".profile__avatar",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

export const formPopupProfileEdit = document.querySelector(
  ".popup__form_type_edit"
);
export const buttonOpenPopupProfileEdit = document.querySelector(
  ".profile__edit-button"
);
export const popupName = document.querySelector(".popup__input_type_name");
export const popupJob = document.querySelector(".popup__input_type_profession");

export const formPopupAddPlace = document.querySelector(
  ".popup__form_type_add"
);
export const buttonOpenPopupAddPlace = document.querySelector(
  ".profile__add-button"
);

export const formPopupAvatarEdit = document.querySelector(
  ".popup__form_type_avatar"
);
export const buttonOpenPopupAvatarEdit = document.querySelector(
  ".profile__avatar-edit"
);
