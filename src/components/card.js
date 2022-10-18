import { openModalWindow } from "./modal";
import {
  popupElement,
  cardElementTemplate,
  popupImageTitle,
  popupImage,
} from "./variables";
import {
  getLikeAdded,
  getLikeDelete,
  getProfileInfo,
  getCardRemoved,
} from "./api";

function prepareImagePopup(cardObj) {
  // Внесение данных в моальное окно с изображением
  popupImageTitle.textContent = cardObj.name;
  popupImage.src = cardObj.link;
  popupImage.alt = "Фотография " + cardObj.name;
  openModalWindow(popupElement);
}

// --Функция-обработчик лайка--
function likeImage(cardObj, likeElement, counterElement) {
  getProfileInfo().then((personObj) => {
    if (JSON.stringify(cardObj.likes).includes(JSON.stringify(personObj))) {
      getLikeDelete(cardObj).then((obj) => {
        counterElement.textContent = obj.likes.length;
        likeElement.classList.remove("card__like_active");
        cardObj.likes = JSON.parse(
          JSON.stringify(cardObj.likes).replace(JSON.stringify(personObj), "")
        );
      });
    } else {
      getLikeAdded(cardObj).then((obj) => {
        counterElement.textContent = obj.likes.length;
        likeElement.classList.add("card__like_active");
        cardObj.likes.push(personObj);
      });
    }
  });
}

// --Инициализация состояния лайка--
function initLikeState(cardObj, likeElement) {
  getProfileInfo().then((personObj) => {
    if (JSON.stringify(cardObj.likes).includes(JSON.stringify(personObj))) {
      likeElement.classList.add("card__like_active");
    } else {
      likeElement.classList.remove("card__like_active");
    }
  });
}

// --Подготовка кнопки удаления--
function prepareTrashButton(obj, trashElement) {
  getProfileInfo().then((data) => {
    if (data._id === obj.owner._id) {
      trashElement.addEventListener("click", function (evt) {
        removeCard(obj, trashElement.parentElement);
      });
    } else {
      trashElement.remove();
    }
  });
}

// --Удаление карты--
function removeCard(cardObj, cardElement) {
  getCardRemoved(cardObj).then(() => {
    cardElement.remove();
  });
}

function makeNewCard(Obj) {
  //Создание карточки
  let cardObj = Obj;
  const newCardElement = cardElementTemplate.cloneNode(true);
  const likeButtonElement = newCardElement.querySelector(".card__like");
  const trashButtonElement = newCardElement.querySelector(".card__trash");
  const cardImageElement = newCardElement.querySelector(".card__image");
  const likesCountedElement = newCardElement.querySelector(
    ".card__likes-counter"
  );
  likesCountedElement.textContent = cardObj.likes.length;
  cardImageElement.alt = "Фотография " + cardObj.name;
  cardImageElement.src = cardObj.link;
  newCardElement.querySelector(".card__caption").textContent = cardObj.name;

  initLikeState(cardObj, likeButtonElement);

  likeButtonElement.addEventListener("click", () => {
    likeImage(cardObj, likeButtonElement, likesCountedElement);
  });

  prepareTrashButton(cardObj, trashButtonElement);

  cardImageElement.addEventListener("click", function () {
    prepareImagePopup(cardObj);
  });

  return newCardElement;
}

export { makeNewCard };
