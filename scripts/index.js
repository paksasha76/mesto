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
const cardImage = document.querySelector(".card__img");
const buttonCloseZoom = document.querySelector(".popup-zoom__close-btn");
const cardTitle = document.querySelector(".card__title");

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
    closePopupAdd();
}

cardLike.forEach(like => {
    like.addEventListener('click', function () {
        const listItem = like.closest('.card__btn-like');
        listItem.classList.add('card__btn_like-active');
      }); 
})


buttonDelete.forEach(card => {
    card.addEventListener('click', function () {
        const listItem = card.closest('.card');
        listItem.remove();
      }); 
})


cardImage.addEventListener("click", (event) => {
  openPopupZoom(popupZoom);
  popupImage.src = event.target.src;
  popupZoomText.textContent = cardTitle.textContent;
});

buttonEdit.addEventListener("click", openPopup);
buttonAdd.addEventListener("click", openPopupAdd);

buttonClose.addEventListener("click", closePopup);
buttonCloseAdd.addEventListener("click", closePopupAdd);
buttonCloseZoom.addEventListener("click", closePopupZoom);

popupForm.addEventListener("submit", handleFormSubmit);
popupFormAdd.addEventListener("submit", handleFormSubmit);

