const profilePopup = document.querySelector(".popup");
const buttonEdit = document.querySelector(".profile__edit-btn");
const profileForm = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

const buttonAdd = document.querySelector(".profile__add-btn");
const popupAdd = document.querySelector(".popup-add");
const popupFormAdd =  document.querySelector(".popup__form-add");
const nameInputCard = document.querySelector(".popup__input_type_card-name");
const linkInputCard = document.querySelector(".popup__input_type_card-link");
const popupEdit = document.querySelector(".popup-edit");
const saveButtonEdit = document.querySelector(".popup__save-btn-edit")


const profileCloseButton = document.querySelector(".popup__close-btn");
const buttonCloseAdd = document.querySelector(".popup__close-btn-add");

const cards = document.querySelector(".cards");
const card = document.querySelector(".card");

const popupZoom = document.querySelector(".popup-zoom");
const popupImage = document.querySelector(".popup-zoom__image");
const popupZoomText = document.querySelector(".popup-zoom__text");
const buttonCloseZoom = document.querySelector(".popup-zoom__close-btn");
const cardTitle = document.querySelector(".card__title");

const buttonCreate = document.querySelector(".popup__save-btn-create");

const initialCards = [
    {
      name: 'Токио',
      link: 'https://preview.redd.it/5nxgafq6c9d71.jpg?auto=webp&s=4a5ad8cf9c7bf372897f570eb0fdca2b2ba52ea6'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function openPopupAdd() {
    openPopup(popupAdd);
}

function openPopupProfile() {
    openPopup(popupEdit);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function openPopupZoom() {
  openPopup(popupZoom);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function closePopupProfile() {
  closePopup(popupEdit);
}

function closePopupAdd() {
  closePopup(popupAdd);
}

function closePopupZoom() {
  closePopup(popupZoom);
}

function handleProfileFormSubmit(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopupProfile();
}

function handleAddFormSubmit(event) {
  event.preventDefault();
  const name = nameInputCard.value
  const link = linkInputCard.value
  addNewCard(name, link);
  event.target.reset();
  closePopupAdd();
}

function createCard(name, link) {
  const template = document.querySelector("#card").content;
  const cardElement = template.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__img");
  const newCardTitle = cardElement.querySelector(".card__title");
  const newButtonDelete = cardElement.querySelector(".card__btn-delete");
  const newButtonLike = cardElement.querySelector(".card__btn-like");
  cardImage.src = link;
  cardImage.alt = name;
  newCardTitle.textContent = cardImage.alt;

  newButtonDelete.addEventListener("click", () => cardElement.remove());
  newButtonLike.addEventListener("click", () => newButtonLike.classList.toggle('card__btn_like-active'));
  cardImage.addEventListener('click', (event) => {
    openPopupZoom(popupZoom);
    popupImage.src = event.target.src;
    popupImage.alt = event.target.alt;
    popupZoomText.textContent = popupImage.alt;
    });

return cardElement;
}

function addNewCard(name, link) {
  const newCard = createCard(name, link);
  cards.prepend(newCard);
}

initialCards.forEach((card) => {
  addNewCard(card.name, card.link);
});


buttonEdit.addEventListener("click", openPopupProfile);
buttonAdd.addEventListener("click", openPopupAdd);

profileCloseButton.addEventListener("click", closePopupProfile);
buttonCloseAdd.addEventListener("click", closePopupAdd);
buttonCloseZoom.addEventListener("click", closePopupZoom);

profileForm.addEventListener("submit", handleProfileFormSubmit);

popupFormAdd.addEventListener("submit", handleAddFormSubmit);

document.addEventListener("keydown", (event) => {
  if (event.key === 'Escape') {
    closePopupProfile();
    closePopupAdd();
    closePopupZoom();
  }
});

function popupCloseOverlay(popup) {
popup.addEventListener('click', (event) => {
  if (event.target == popup) {
   closePopupProfile();
   closePopupAdd();
   closePopupZoom();
   }
  }
 )
}

popupCloseOverlay(popupEdit);
popupCloseOverlay(popupAdd);
popupCloseOverlay(popupZoom);


function required(firstField, secondField, button) {
  if (firstField.value.length === 0 || secondField.value.length === 0) {
    button.disabled = true;
    button.classList.add("popup__save-btn-disabled");
  }
  else {
    button.disabled = false;
    button.classList.remove("popup__save-btn-disabled");
  }
}


function requiredAdd() {
  required(nameInputCard, linkInputCard, buttonCreate);
}

function requiredEdit() {
  required(nameInput, jobInput, saveButtonEdit);
}

popupFormAdd.addEventListener('keydown', requiredAdd);
profileForm.addEventListener('keydown', requiredEdit);