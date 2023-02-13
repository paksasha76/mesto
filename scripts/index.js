const popup = document.querySelector(".popup");
const buttonEdit = document.querySelector(".profile__edit-btn");
const popupForm = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

const buttonAdd = document.querySelector(".profile__add-btn");
const popupAdd = document.querySelector(".popup__add");
const popupFormAdd =  document.querySelector(".popup__form-add");
const nameInputCard = document.querySelector(".popup__input_type_card-name");
const linkInputCard = document.querySelector(".popup__input_type_card-link");
const popupEdit = document.querySelector(".popup__edit");


const buttonClose = document.querySelector(".popup__close-btn");
const buttonCloseAdd = document.querySelector(".popup__close_add-btn");

const buttonDelete = Array.from(document.querySelectorAll(".card__btn-delete"));
const card = document.querySelector(".card");
const cardLike = Array.from(document.querySelectorAll(".card__btn-like"));

const popupZoom = document.querySelector(".popup-zoom");
const popupImage = document.querySelector(".popup-zoom__image");
const popupZoomText = document.querySelector(".popup-zoom__text");
const cardImage = Array.from(document.querySelectorAll(".card__img"));
const buttonCloseZoom = document.querySelector(".popup-zoom__close-btn");
const cardTitle = document.querySelector(".card__title");

const buttonCreate = document.querySelector(".popup__save_btn-create");
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

function AddFormSubmit(event) {
  event.preventDefault();
  const name = nameInputCard.value
  const link = linkInputCard.value
  addNewCard(name, link);
  closePopupAdd();
}

function addNewCard(name, link) {
  const newCard = document.createElement('div');
  newCard.classList.add('card')
  const newCardImg = document.createElement('img');
  newCardImg.classList.add('card__img');
  const newCardBlock = document.createElement('div');
  newCardBlock.classList.add('card__block');
  const newCardTitle = document.createElement('h2');
  newCardTitle.classList.add('card__title');
  const newButtonLike = document.createElement('button');
  newButtonLike.classList.add('card__btn-like');
  const newButtonDelete = document.createElement('button');
  newButtonDelete.classList.add('card__btn-delete');

  newCardTitle.textContent = name;
  newCardImg.src = link;

  cards.appendChild(newCard);
  newCard.appendChild(newCardImg);
  newCard.appendChild(newCardBlock);
  newCard.appendChild(newButtonDelete);
  newCardBlock.appendChild(newCardTitle);
  newCardBlock.appendChild(newButtonLike);

 

  newButtonDelete.addEventListener('click', () => newCard.remove())
  newButtonLike.addEventListener('click', () => {newButtonLike.classList.toggle('card__btn_like-active')})
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

buttonClose.addEventListener("click", closePopup);
buttonCloseAdd.addEventListener("click", closePopupAdd);
buttonCloseZoom.addEventListener("click", closePopupZoom);

popupForm.addEventListener("submit", handleFormSubmit);

popupFormAdd.addEventListener("submit", AddFormSubmit);
