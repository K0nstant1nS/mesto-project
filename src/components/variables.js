const personAddPopup = document.querySelector("#profile__add");
const cardsContainerElement = document.querySelector(".places-cards");
const personEditPopup = document.querySelector("#profile__edit");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const personNameElement = document.querySelector(".profile__name");
const personAboutElement = document.querySelector(".profile__about");
const personNameInput = document.querySelector("[name='guest-name']");
const personAboutInput = document.querySelector("[name='guest-about']");
const pictureNameInput = document.querySelector("[name='place-name']");
const pictureLinkInput = document.querySelector("[name='place-link']");
const cardFormElement = document.querySelector("[name='card-form']");
const guestFormObj = {
  formName: "guest-form",
  submitButtonSelector: ".popup__save",
  inputSelector: ".popup__text-input",
};
const cardFormObj = {
  formName: "card-form",
  submitButtonSelector: ".popup__save",
  inputSelector: ".popup__text-input",
};

export {
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
};
