let popup = document.querySelector(".popup");
let buttonEdit = document.querySelector(".profile__edit-btn");
let popupForm = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_job");
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");

let buttonAdd = document.querySelector(".profile__add-btn");
let popupAdd = document.querySelector(".popup__add");
let popupFormAdd =  document.querySelector(".popup__form-add");
let nameInputCard = document.querySelector(".popup__input_type_card-name");
let linkInputCard = document.querySelector(".popup__input_type_card-link");
let popupEdit = document.querySelector(".popup__edit");

let buttonClose = document.querySelector(".popup__close-btn");
let buttonCloseAdd = document.querySelector(".popup__close_add-btn");

let buttonDelete = Array.from(document.querySelectorAll(".card__btn-delete"));
let card = document.querySelector(".card");
let cardLike = Array.from(document.querySelectorAll(".card__btn-like"));

let popupZoom = document.querySelector(".popup-zoom");
let popupImage = document.querySelector(".popup-zoom__image");
let popupZoomText = document.querySelector(".popup-zoom__text");
let cardImage = document.querySelector(".card__img");
let buttonCloseZoom = document.querySelector(".popup-zoom__close-btn");
let cardTitle = document.querySelector(".card__title");

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

let link = `${initialCards.name}`

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

buttonEdit.addEventListener("click", openPopup);
buttonAdd.addEventListener("click", openPopupAdd);

buttonClose.addEventListener("click", closePopup);
buttonCloseAdd.addEventListener("click", closePopupAdd);
buttonCloseZoom.addEventListener("click", closePopupZoom);

popupForm.addEventListener("submit", handleFormSubmit);
popupFormAdd.addEventListener("submit", handleFormSubmit);


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





