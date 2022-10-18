import { openModalWindow, closeModalWindow } from "./modal";
import {
  cardRemovePopup,
  cardRemoveForm,
  cardRemoveSubmitButton,
  popupElement,
  cardElementTemplate,
  popupImageTitle,
  popupImage,
} from "./variables";
import { getLikeAdded, getLikeDelete, getCardRemoved } from "./api";

function prepareImagePopup(cardObj) {
  // Внесение данных в моальное окно с изображением
  popupImageTitle.textContent = cardObj.name;
  popupImage.src = cardObj.link;
  popupImage.alt = "Фотография " + cardObj.name;
  openModalWindow(popupElement);
}

// --Функция-обработчик лайка--
function likeImage(cardObj, likeElement, counterElement, idObj) {
  if (JSON.stringify(cardObj.likes).includes(JSON.stringify(idObj))) {
    getLikeDelete(cardObj)
      .then((obj) => {
        counterElement.textContent = obj.likes.length;
        likeElement.classList.remove("card__like_active");
        cardObj.likes = JSON.parse(
          JSON.stringify(cardObj.likes).replace(JSON.stringify(idObj), "")
        );
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    getLikeAdded(cardObj)
      .then((obj) => {
        counterElement.textContent = obj.likes.length;
        likeElement.classList.add("card__like_active");
        cardObj.likes.push(idObj);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// --Инициализация состояния лайка--
function initLikeState(cardObj, likeElement, idObj) {
  if (JSON.stringify(cardObj.likes).includes(JSON.stringify(idObj))) {
    likeElement.classList.add("card__like_active");
  } else {
    likeElement.classList.remove("card__like_active");
  }
}

// --Подготовка кнопки удаления--
function prepareTrashButton(obj, trashElement, idObj) {
  if (idObj._id === obj.owner._id) {
    trashElement.addEventListener("click", function (evt) {
      openModalWindow(cardRemovePopup);
      cardRemoveForm.onsubmit = function (evt) {
        evt.preventDefault();
        cardRemoveSubmitButton.textContent =
          cardRemoveSubmitButton.dataset.onload;
        removeCard(obj, trashElement.parentElement);
      };
    });
  } else {
    trashElement.remove();
  }
}

// --Удаление карты--
function removeCard(cardObj, cardElement) {
  getCardRemoved(cardObj)
    .then(() => {
      cardElement.remove();
      closeModalWindow(cardRemovePopup);
      cardRemoveSubmitButton.textContent =
        cardRemoveSubmitButton.dataset.default;
    })
    .catch((err) => {
      console.log(err);
    });
}

function makeNewCard(Obj, idObj) {
  //Создание карточки
  const cardObj = Obj;
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

  initLikeState(cardObj, likeButtonElement, idObj);

  likeButtonElement.addEventListener("click", () => {
    likeImage(cardObj, likeButtonElement, likesCountedElement, idObj);
  });

  prepareTrashButton(cardObj, trashButtonElement, idObj);

  cardImageElement.addEventListener("click", function () {
    prepareImagePopup(cardObj);
  });

  return newCardElement;
}

export { makeNewCard };
