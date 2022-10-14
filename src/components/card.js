import { openModalWindow, closeModalWindow } from "./modal";

const cardElementTemplate = document.querySelector("#card-template").content;

function addCard(cardObj, cardsContainerSelector) {
  //Добавление карточки
  const cardsContainerElement = document.querySelector(cardsContainerSelector);
  cardsContainerElement.prepend(makeNewCard(cardObj));
}

function prepareImagePopup(cardObj, imagePopupSelector) {
  // Внесение данных в моальное окно с изображением
  const popupElement = document.querySelector(imagePopupSelector);
  popupElement.querySelector(".popup__image-title").textContent = cardObj.name;
  popupElement.querySelector(".popup__image").src = cardObj.link;
  popupElement.querySelector(".popup__image").alt =
    "Фотография " + cardObj.name;
  openModalWindow(popupElement);
}

function makeNewCard(cardObj) {
  //Создание карточки
  const newCardElement = cardElementTemplate.cloneNode(true);
  const likeButtonElement = newCardElement.querySelector(".card__like");
  const trashButtonElement = newCardElement.querySelector(".card__trash");
  const cardImageElement = newCardElement.querySelector(".card__image");
  cardImageElement.alt = "Фотография " + cardObj.name;
  cardImageElement.src = cardObj.link;
  newCardElement.querySelector(".card__caption").textContent = cardObj.name;

  likeButtonElement.addEventListener("click", () => {
    likeButtonElement.classList.toggle("card__like_active");
  });

  trashButtonElement.addEventListener("click", () =>
    trashButtonElement.parentElement.remove()
  );

  cardImageElement.addEventListener("click", function () {
    prepareImagePopup(cardObj, "#image-popup");
  });

  return newCardElement;
}

function addCardInPopup(evt, popupElementSelector, formSelector) {
  //Добавление карточки через popup
  const popupElement = document.querySelector(popupElementSelector);
  evt.preventDefault();
  const newCard = {
    name: popupElement.querySelector("[name='place-name']").value,
    link: popupElement.querySelector("[name='place-link']").value,
  };
  const img = new Image();
  img.onload = function () {
    addCard(newCard, ".places-cards");
  };
  img.src = newCard.link;
  closeModalWindow(popupElement);
  popupElement.querySelector(formSelector).reset();
}

export { makeNewCard, addCard, addCardInPopup };
