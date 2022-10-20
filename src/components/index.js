import "../pages/index.css";
import { validateForm, prepareOnOpen } from "./validate";
import { makeNewCard } from "./card";
import { openModalWindow, closeModalWindow, closePopup } from "./modal";
import {
  cardRemovePopup,
  cardRemoveForm,
  cardRemoveSubmitButton,
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
  guestFormObj,
  cardFormObj,
  avatarFormObj,
  cardRemoveData,
} from "./variables";
import {
  postCard,
  patchAvatar,
  patchProfile,
  getProfileInfo,
  initialCards,
  getLikeAdded,
  getLikeDelete,
  getCardRemoved,
} from "./api";

// --Изменение информации в профиле--
function changeProfileInfo(data) {
  personNameElement.textContent = data.name;
  personAboutElement.textContent = data.about;
}

function changeProfileAvatar(url) {
  profileAvatarImage.src = url;
}

// --Добавление лайка--

function addLike(data) {
  getLikeAdded(data.cardObj)
    .then((obj) => {
      data.changeStateFunc(data, obj, true);
    })
    .catch((err) => {
      console.log(err);
    });
}

// --Удаление лайка--

function deleteLike(data) {
  getLikeDelete(data.cardObj)
    .then((obj) => {
      data.changeStateFunc(data, obj);
    })
    .catch((err) => {
      console.log(err);
    });
}

// --Удаление карты--

function removeCard(removeData) {
  cardRemoveSubmitButton.textContent = cardRemoveSubmitButton.dataset.onload;
  getCardRemoved(removeData.cardRemoveTargetObj)
    .then(() => {
      removeData.remove(removeData.cardRemoveTargetElement);
      closeModalWindow(cardRemovePopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      cardRemoveSubmitButton.textContent =
        cardRemoveSubmitButton.dataset.default;
    });
}

function addCard(cardObj, idObj) {
  //Добавление карточки
  cardsContainerElement.prepend(
    makeNewCard({
      Obj: cardObj,
      idObj: idObj,
      addLike: addLike,
      deleteLike: deleteLike,
    })
  );
}

function initCard(cardObj, idObj) {
  //Добавление карточки
  cardsContainerElement.append(
    makeNewCard({
      Obj: cardObj,
      idObj: idObj,
      addLike: addLike,
      deleteLike: deleteLike,
    })
  );
}

function addCardInPopup(evt) {
  //Добавление карточки через popup
  personAddSubmit.textContent = personAddSubmit.dataset.onload;
  evt.preventDefault();
  postCard(pictureNameInput, pictureLinkInput)
    .then((obj) => {
      addCard(obj, obj.owner);
      closeModalWindow(personAddPopup);
      cardFormElement.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      personAddSubmit.textContent = personAddSubmit.dataset.default;
    });
}

// --Запрос на замену аватара--

function changeAvatarOnSubmit(evt) {
  evt.preventDefault();
  avatarChangeSubmit.textContent = avatarChangeSubmit.dataset.onload;
  patchAvatar(avatarImageInput)
    .then(() => {
      changeProfileAvatar(avatarImageInput.value);
      closeModalWindow(avatarChangePopup);
      avatarFormElement.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarChangeSubmit.textContent = avatarChangeSubmit.dataset.default;
    });
}

// --Запрос на замену информации в профиле--

function changeProfileOnSubmit(evt) {
  evt.preventDefault();
  // --Изменение профиля --
  personEditSubmit.textContent = personEditSubmit.dataset.onload;
  patchProfile(personNameInput, personAboutInput)
    .then(() => {
      changeProfileInfo({
        name: personNameInput.value,
        about: personAboutInput.value,
      });
      closeModalWindow(personEditPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      personEditSubmit.textContent = personEditSubmit.dataset.default;
    });
  //
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

Promise.all([getProfileInfo(), initialCards()])
  .then((values) => {
    values[1].forEach(function (cardObj) {
      // Убрал пока проверку onload, из-за нее при первой загрузке карточки появляются в порядке этой самой загрузки
      initCard(cardObj, values[0]);
    });
    changeProfileInfo(values[0]);
    changeProfileAvatar(values[0].avatar);
  })
  .catch((err) => {
    console.log(err);
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

cardRemoveForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  removeCard(cardRemoveData);
});
