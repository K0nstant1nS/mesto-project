import "../pages/index.css";
import { initialCards } from "./initialCards";
import { validateForm, prepareOnOpen } from "./validate";
import { makeNewCard } from "./card";
import { openModalWindow, closeModalWindow, closePopup } from "./modal";
import {
  personAddPopup,
  personAddSubmit,
  avatarChangePopup,
  avatarChangeSubmit,
  cardsContainerElement,
  personEditPopup,
  personEditSubmit,
  profileEditButton,
  profileAddButton,
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
  guestFormObj,
  cardFormObj,
  avatarFormObj,
} from "./variables";
import { changeProfileAvatar, changeProfileInfo } from "./utils";
import { postCard, patchAvatar, patchProfile, getProfileInfo } from "./api";

function addCard(cardObj) {
  //Добавление карточки
  cardsContainerElement.prepend(makeNewCard(cardObj));
}

function addCardInPopup(evt) {
  //Добавление карточки через popup
  personAddSubmit.textContent = personAddSubmit.dataset.onload;
  evt.preventDefault();
  postCard(pictureNameInput, pictureLinkInput)
    .then((data) => {
      return data.json();
    })
    .then((obj) => {
      const img = new Image();
      img.onload = function () {
        addCard(obj);
      };
      img.src = obj.link;
      closeModalWindow(personAddPopup);
      personAddSubmit.textContent = personAddSubmit.dataset.default;
      cardFormElement.reset();
    })
    .catch((err) => {
      throw new Error(err);
    });
}

function changeAvatarOnSubmit(evt) {
  evt.preventDefault();
  avatarChangeSubmit.textContent = avatarChangeSubmit.dataset.onload;
  patchAvatar(avatarImageInput).then(() => {
    changeProfileAvatar(avatarImageInput.value);
    closeModalWindow(avatarChangePopup);
    avatarChangeSubmit.textContent = avatarChangeSubmit.dataset.default;
    avatarFormElement.reset();
  });
}

function changeProfileOnSubmit(evt) {
  evt.preventDefault();
  // --Изменение профиля --
  personEditSubmit.textContent = personEditSubmit.dataset.onload;
  patchProfile(personNameInput, personAboutInput).then((data) => {
    changeProfileInfo({
      name: personNameInput.value,
      about: personAboutInput.value,
    });
    personEditSubmit.textContent = personEditSubmit.dataset.onload;
  });
  //
  closeModalWindow(personEditPopup);
}

// --Инициализация валидации форм--

validateForm(guestFormObj);

validateForm(cardFormObj);

validateForm(avatarFormObj);

//

document.querySelectorAll(".popup").forEach(function (item) {
  item.classList.add("popup_type_animated");
});

// --Инициализация карточек--

initialCards
  .then((res) => {
    res.forEach(function (cardObj) {
      const img = new Image();
      img.onload = function () {
        addCard(cardObj);
      };
      img.src = cardObj.link;
    });
  })
  .catch((err) => {
    throw new Error(err);
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
  .addEventListener("submit", changeProfileOnSubmit);

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

avatarChangeButton.addEventListener("click", function (evt) {
  openModalWindow(avatarChangePopup);
  prepareOnOpen(avatarFormObj);
});

//

// --Поведение popup(а) с карточками при открытии--

cardFormElement.addEventListener("submit", addCardInPopup);

avatarFormElement.addEventListener("submit", changeAvatarOnSubmit);

// --Подгрузка ползователя--

getProfileInfo()
  .then((data) => {
    return data.json();
  })
  .then((personObj) => {
    changeProfileInfo(personObj);
    changeProfileAvatar(personObj.avatar);
  });
