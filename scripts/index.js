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


const profileCloseButton = document.querySelector(".popup__close-btn");
const buttonCloseAdd = document.querySelector(".popup__close-btn-add");

const buttonDelete = Array.from(document.querySelectorAll(".card__btn-delete"));
const card = document.querySelector(".card");
const cardLike = Array.from(document.querySelectorAll(".card__btn-like"));

const popupZoom = document.querySelector(".popup-zoom");
const popupImage = document.querySelector(".popup-zoom__image");
const popupZoomText = document.querySelector(".popup-zoom__text");
const cardImage = Array.from(document.querySelectorAll(".card__img"));
const buttonCloseZoom = document.querySelector(".popup-zoom__close-btn");
const cardTitle = document.querySelector(".card__title");

const buttonCreate = document.querySelector(".popup__save-btn-create");
const cards = document.querySelector(".cards");

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
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

function openPopupAdd() {
    popupAdd.classList.add("popup_opened");
    nameInputCard.value = '';
    linkInputCard.value = '';
}

function openPopup() {
    popupEdit.classList.add("popup_opened");
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function openPopupZoom() {
  popupZoom.classList.add("popup_opened");
}

function closePopup() {
    popupEdit.classList.remove("popup_opened");
}


function closePopupAdd() {
    popupAdd.classList.remove("popup_opened");
}

function closePopupZoom() {
  popupZoom.classList.remove("popup_opened");
}

function handleFormSubmit(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}

function addFormSubmit(event) {
  event.preventDefault();
  const name = nameInputCard.value
  const link = linkInputCard.value
  addNewCard(name, link);
  closePopupAdd();
}

function addNewCard(name, link) {
  const template = document.querySelector("#card").content
  const newCard = template.querySelector(".card").cloneNode(true);
  const cardImage = newCard.querySelector(".card__img");
  const newCardTitle = newCard.querySelector(".card__title");
  const newButtonDelete = newCard.querySelector(".card__btn-delete");
  const newButtonLike = newCard.querySelector(".card__btn-like");
  cardImage.src = link;
  cardImage.alt = name;
  newCardTitle.textContent = cardImage.alt
  cards.prepend(newCard)

  newButtonDelete.addEventListener("click", () => newCard.remove());
  newButtonLike.addEventListener("click", () => newButtonLike.classList.toggle('card__btn_like-active'));
  cardImage.addEventListener('click', (event) => {
    openPopupZoom(popupZoom);
    popupImage.src = event.target.src;
    popupImage.alt = event.target.alt;
    popupZoomText.textContent = popupImage.alt
    });
}


cardLike.forEach(like => {
    like.addEventListener('click', (event) => {
        event.target.classList.toggle('card__btn_like-active');
      }); 
})

buttonDelete.forEach(card => {
    card.addEventListener('click', () => {
        const listItem = card.closest('.card');
        listItem.remove();
      }); 
})

initialCards.forEach((card) => {
  addNewCard(card.name, card.link);
});

cardImage.forEach(image => {
  image.addEventListener("click", (event) => {
  openPopupZoom(popupZoom);
  popupImage.src = event.target.src;
  popupImage.alt = event.target.alt;
  popupZoomText.textContent = popupImage.alt
  });
});

buttonEdit.addEventListener("click", openPopup);
buttonAdd.addEventListener("click", openPopupAdd);

profileCloseButton.addEventListener("click", closePopup);
buttonCloseAdd.addEventListener("click", closePopupAdd);
buttonCloseZoom.addEventListener("click", closePopupZoom);

profileForm.addEventListener("submit", handleFormSubmit);

popupFormAdd.addEventListener("submit", addFormSubmit);
