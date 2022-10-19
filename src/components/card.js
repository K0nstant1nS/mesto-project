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

// --Переключение сосотояния лайка--

function changeLikeState(likeElement) {
  likeElement.classList.toggle("card__like_active");
}

// --Проверка на наличие id пользователя в объекте влайдельца карты--

function checkLikeState(cardObj, idObj) {
  return cardObj.likes.filter(function (item) {
    return item._id === idObj._id;
  }).length > 0
    ? true
    : false;
}

// --Инициализация состояния лайка--

function initLikeState(cardObj, likeElement, idObj) {
  if (JSON.stringify(cardObj.likes).includes(JSON.stringify(idObj))) {
    likeElement.classList.add("card__like_active");
  } else {
    likeElement.classList.remove("card__like_active");
  }
}

function makeNewCard(Obj, idObj, prepareTrashButton, addLike, deleteLike) {
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
    checkLikeState(cardObj, idObj)
      ? deleteLike(
          cardObj,
          likeButtonElement,
          likesCountedElement,
          idObj,
          changeLikeState
        )
      : addLike(
          cardObj,
          likeButtonElement,
          likesCountedElement,
          idObj,
          changeLikeState
        );
  });

  prepareTrashButton(cardObj, trashButtonElement, idObj);

  cardImageElement.addEventListener("click", function () {
    prepareImagePopup(cardObj);
  });

  return newCardElement;
}

export { makeNewCard };
