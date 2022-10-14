import { openModalWindow } from "./modal";

const cardElementTemplate = document.querySelector("#card-template").content;
const cardsContainerElement = document.querySelector(".places-cards");
const imagePopupElement = document.querySelector("#image-popup");

function addCard(cardObj) {
  //Добавление карточки
  cardsContainerElement.prepend(makeNewCard(cardObj));
}

function prepareImagePopup(cardObj, popupElement) {
  // Внесение данных в моальное окно с изображением
  imagePopupElement.querySelector(".popup__image-title").textContent =
    cardObj.name;
  imagePopupElement.querySelector(".popup__image").src = cardObj.link;
  imagePopupElement.querySelector(".popup__image").alt =
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
    prepareImagePopup(cardObj, imagePopupElement);
  });

  return newCardElement;
}

export { makeNewCard, addCard };
