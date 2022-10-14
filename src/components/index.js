import "../pages/index.css";
import { initialCards } from "./initialCards";
import { initValidationForms } from "./validate";
import { addCard, addCardInPopup } from "./card";
import { openModalWindow, closeModalWindow, closePopup } from "./modal";

const personAddPopup = document.querySelector("#profile__add");
const personEditPopup = document.querySelector("#profile__edit");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const personNameElement = document.querySelector(".profile__name");
const personAboutElement = document.querySelector(".profile__about");
const personNameInput = document.querySelector("[name='guest-name']");
const personAboutInput = document.querySelector("[name='guest-about']");

// --Инициализация валидации форм--

initValidationForms();

//

document.querySelectorAll(".popup").forEach(function (item) {
  item.classList.add("popup_type_animated");
});

// --Инициализация карточек--

initialCards.forEach(function (cardObj) {
  const img = new Image();
  img.onload = function () {
    addCard(cardObj, ".places-cards");
  };
  img.src = cardObj.link;
});

//

// --Добавление обработчиков для закрытия popup и работы с данными--

document.addEventListener("mousedown", (evt) => {
  if (document.querySelector(".popup_opened")) {
    const currentPopupElement = document.querySelector(".popup_opened");
    closePopup(currentPopupElement, evt);
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
  openModalWindow(personEditPopup, true);
});

profileAddButton.addEventListener("click", function () {
  openModalWindow(personAddPopup, true);
});

//

// --Поведение popup(а) с карточками при открытии--

document
  .querySelector("[name='card-form']")
  .addEventListener("submit", function (evt) {
    //Добавление карточки через popup
    addCardInPopup(evt, "#profile__add", "[name='card-form']");
  });
