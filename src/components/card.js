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

function initLikeState(likeElement, result) {
  result
    ? likeElement.classList.add("card__like_active")
    : likeElement.classList.remove("card__like_active");
}

function makeNewCard(data) {
  //Создание карточки
  const cardObj = data.Obj;
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

  initLikeState(likeButtonElement, checkLikeState(cardObj, data.idObj));

  likeButtonElement.addEventListener("click", () => {
    checkLikeState(cardObj, data.idObj)
      ? data.deleteLike({
          cardObj: cardObj,
          likeElement: likeButtonElement,
          counterElement: likesCountedElement,
          idObj: data.idObj,
          changeStateFunc: changeLikeState,
        })
      : data.addLike({
          cardObj: cardObj,
          likeElement: likeButtonElement,
          counterElement: likesCountedElement,
          idObj: data.idObj,
          changeStateFunc: changeLikeState,
        });
  });

  data.prepareTrashButton(cardObj, trashButtonElement, data.idObj);

  cardImageElement.addEventListener("click", function () {
    prepareImagePopup(cardObj);
  });

  return newCardElement;
}

export { makeNewCard };
