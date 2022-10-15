import "../pages/index.css";
import { initialCards } from "./initialCards";
import { validateForm, prepareOnOpen } from "./validate";
import { makeNewCard } from "./card";
import { openModalWindow, closeModalWindow, closePopup } from "./modal";
import {
  personAddPopup,
  cardsContainerElement,
  personEditPopup,
  profileEditButton,
  profileAddButton,
  personNameElement,
  personAboutElement,
  personNameInput,
  personAboutInput,
  pictureNameInput,
  pictureLinkInput,
  cardFormElement,
  guestFormObj,
  cardFormObj,
} from "./variables";

function addCard(cardObj) {
  //Добавление карточки
  cardsContainerElement.prepend(makeNewCard(cardObj));
}

function addCardInPopup(evt) {
  //Добавление карточки через popup
  evt.preventDefault();
  const newCard = {
    name: pictureNameInput.value,
    link: pictureLinkInput.value,
  };
  const img = new Image();
  img.onload = function () {
    addCard(newCard);
  };
  img.src = newCard.link;
  closeModalWindow(personAddPopup);
  cardFormElement.reset();
}

// --Инициализация валидации форм--

validateForm(guestFormObj);

validateForm(cardFormObj);

//

document.querySelectorAll(".popup").forEach(function (item) {
  item.classList.add("popup_type_animated");
});

// --Инициализация карточек--

initialCards.forEach(function (cardObj) {
  const img = new Image();
  img.onload = function () {
    addCard(cardObj);
  };
  img.src = cardObj.link;
});

//

// --Добавление обработчиков для закрытия popup и работы с данными--

document.addEventListener("mousedown", (evt) => {
  if (document.querySelector(".popup_opened")) {
    closePopup(evt);
  }
});

document
  .querySelector("[name='guest-form']")
  .addEventListener("submit", (evt) => {
    evt.preventDefault();
    personNameElement.textContent = personNameInput.value;
    personAboutElement.textContent = personAboutInput.value;
    closeModalWindow(personEditPopup);
  });

profileEditButton.addEventListener("click", function () {
  //Получение значений при открытии popup
  personNameInput.value = personNameElement.textContent;
  personAboutInput.value = personAboutElement.textContent;
});

profileEditButton.addEventListener("click", function () {
  openModalWindow(personEditPopup);
  prepareOnOpen(guestFormObj);
});

profileAddButton.addEventListener("click", function () {
  openModalWindow(personAddPopup);
  prepareOnOpen(cardFormObj);
});

//

// --Поведение popup(а) с карточками при открытии--

cardFormElement.addEventListener("submit", addCardInPopup);
