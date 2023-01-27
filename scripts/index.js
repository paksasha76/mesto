let popup = document.querySelector(".popup");
let buttonEdit = document.querySelector(".profile__edit-btn");
let buttonClose = document.querySelector(".popup__close-btn");
let popupForm = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__input_person_name");
let jobInput = document.querySelector(".popup__input_about-me");
let profileName = document.querySelector(".profile__title");
let profileJob = document.querySelector(".profile__subtitle");



function openedPopup() {
    popup.classList.add("popup_opened");
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function closePopup() {
    popup.classList.remove("popup_opened");
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}



buttonEdit.addEventListener("click", openedPopup);
buttonClose.addEventListener("click", closePopup);
popupForm.addEventListener("submit", handleFormSubmit);