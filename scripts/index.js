let popup = document.querySelector(".popup");
let buttonEdit = document.querySelector(".profile__edit-btn");
let buttonClose = document.querySelector(".popup__close-btn");
let popupForm = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__input_name");
let jobInput = document.querySelector(".popup__input_job");
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");

function openPopup() {
    popup.classList.add("popup_opened");
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function closePopup() {
    popup.classList.remove("popup_opened");
}

function handleFormSubmit(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}

buttonEdit.addEventListener("click", openPopup);
buttonClose.addEventListener("click", closePopup);
popupForm.addEventListener("submit", handleFormSubmit);