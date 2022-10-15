import { openModalWindow } from "./modal";
import {
  popupElement,
  cardElementTemplate,
  popupImageTitle,
  popupImage,
} from "./variables";

function prepareImagePopup(cardObj) {
  // Внесение данных в моальное окно с изображением
  popupImageTitle.textContent = cardObj.name;
  popupImage.src = cardObj.link;
  popupImage.alt = "Фотография " + cardObj.name;
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
    prepareImagePopup(cardObj);
  });

  return newCardElement;
}

export { makeNewCard };
