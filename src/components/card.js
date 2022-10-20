import { openModalWindow } from "./modal";
import {
  popupElement,
  cardRemovePopup,
  cardElementTemplate,
  popupImageTitle,
  popupImage,
  cardRemoveData,
} from "./variables";

function prepareImagePopup(cardObj) {
  // Внесение данных в моальное окно с изображением
  popupImageTitle.textContent = cardObj.name;
  popupImage.src = cardObj.link;
  popupImage.alt = "Фотография " + cardObj.name;
  openModalWindow(popupElement);
}

function removeCardFromDOM(cardElement) {
  cardElement.remove();
}

cardRemoveData.remove = removeCardFromDOM;

// --Переключение сосотояния лайка--

function changeLikeState(data, thenObj, bool) {
  if (bool) {
    data.counterElement.textContent = thenObj.likes.length;
    data.likeElement.classList.toggle("card__like_active");
    data.cardObj.likes.push(data.idObj);
  } else {
    data.counterElement.textContent = thenObj.likes.length;
    data.likeElement.classList.toggle("card__like_active");
    data.cardObj.likes = data.cardObj.likes.filter(function (item) {
      return item._id !== data.idObj._id;
    });
  }
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

function checkTrashButtonState(obj, idObj) {
  return idObj._id === obj.owner._id ? true : false;
}

function openCardRemovePopup(obj, trashElement) {
  openModalWindow(cardRemovePopup);
  cardRemoveData.cardRemoveTargetObj = obj;
  cardRemoveData.cardRemoveTargetElement = trashElement.parentElement;
}

function initTrashButtonState(trashButtonElement, result) {
  result ? "" : trashButtonElement.remove();
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

  initTrashButtonState(
    trashButtonElement,
    checkTrashButtonState(cardObj, data.idObj)
  );

  trashButtonElement.addEventListener("click", function () {
    openCardRemovePopup(cardObj, trashButtonElement);
  });

  cardImageElement.addEventListener("click", function () {
    prepareImagePopup(cardObj);
  });

  return newCardElement;
}

export { makeNewCard };
