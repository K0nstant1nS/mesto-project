import "../pages/index.css";
import { initialCards } from "./initialCards";
import { initValidationForms } from "./validate";
import { addCard } from "./card";
import {
  openModalWindow,
  closeModalWindow,
  closePopup,
  closeOnEsc,
} from "./modal";

const popupElementsList = document.querySelectorAll(".popup");
const personAddPopup = document.querySelector("#profile__add");
const personEditPopup = document.querySelector("#profile__edit");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const personNameElement = document.querySelector(".profile__name");
const personAboutElement = document.querySelector(".profile__about");
const personNameInput = document.querySelector("[name='guest-name']");
const personAboutInput = document.querySelector("[name='guest-about']");
const formAddImage = document.querySelector("[name='card-form']");
const formEditProfile = document.querySelector("[name='guest-form']");

// --Инициализация форм--

initValidationForms();

//

popupElementsList.forEach(function (item) {
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

//Добавление обработчика для закрытия popup
document.addEventListener("mousedown", (evt) => {
  if (document.querySelector(".popup_opened")) {
    const currentPopupElement = document.querySelector(".popup_opened");
    closePopup(currentPopupElement, evt);
  }
});

formEditProfile.addEventListener("submit", (evt) => {
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

formAddImage.addEventListener("submit", function (evt) {
  //Добавление карточки через popup
  evt.preventDefault();
  const newCard = {
    name: personAddPopup.querySelector("[name='place-name']").value,
    link: personAddPopup.querySelector("[name='place-link']").value,
  };
  const img = new Image();
  img.onload = function () {
    addCard(newCard);
  };
  img.src = newCard.link;
  closeModalWindow(personAddPopup);
  formAddImage.reset();
});
