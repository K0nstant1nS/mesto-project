const personAddPopup = document.querySelector("#profile__add");
const personAddSubmit = personAddPopup.querySelector(".popup__save");
const avatarChangePopup = document.querySelector("#profile__avatar");
const avatarChangeSubmit = avatarChangePopup.querySelector(".popup__save");
const cardsContainerElement = document.querySelector(".places-cards");
const personEditPopup = document.querySelector("#profile__edit");
const personEditSubmit = personEditPopup.querySelector(".popup__save");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileAvatarImage = document.querySelector(".profile__image");
const avatarChangeButton = document.querySelector(".profile__image-container");
const personNameElement = document.querySelector(".profile__name");
const personAboutElement = document.querySelector(".profile__about");
const personNameInput = document.querySelector("[name='guest-name']");
const personAboutInput = document.querySelector("[name='guest-about']");
const pictureNameInput = document.querySelector("[name='place-name']");
const pictureLinkInput = document.querySelector("[name='place-link']");
const avatarImageInput = document.querySelector("[name='avatar-link']");
const cardFormElement = document.querySelector("[name='card-form']");
const avatarFormElement = document.querySelector("[name='avatar-form']");
const cardElementTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const popupElement = document.querySelector("#image-popup");
const popupImageTitle = popupElement.querySelector(".popup__image-title");
const popupImage = popupElement.querySelector(".popup__image");
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
const avatarFormObj = {
  formName: "avatar-form",
  submitButtonSelector: ".popup__save",
  inputSelector: ".popup__text-input",
};

export {
  personAddPopup,
  personAddSubmit,
  avatarChangePopup,
  avatarChangeSubmit,
  cardsContainerElement,
  personEditPopup,
  personEditSubmit,
  profileEditButton,
  profileAddButton,
  profileAvatarImage,
  avatarChangeButton,
  avatarImageInput,
  personNameElement,
  personAboutElement,
  personNameInput,
  personAboutInput,
  pictureNameInput,
  pictureLinkInput,
  cardFormElement,
  avatarFormElement,
  popupElement,
  cardElementTemplate,
  guestFormObj,
  cardFormObj,
  avatarFormObj,
  popupImageTitle,
  popupImage,
};
