let popup = document.querySelector(".popup");
let popupOpenBtn = document.querySelector(".profile__edit-btn");
let popupCloseBtn = popup.querySelector(".profile__close-btn");
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__about-me");
let formCard = document.querySelector(".popup__form");
let nameInput = formElement.querySelector(".popup__input_person_name");
let jobInput = formElement.querySelector(".popup__input_person_about-me");

function openPopup () {
    popup.classList.add("popup_opened");
}

function closePopup () {
    popup.classList.remove("popup_opened");
}