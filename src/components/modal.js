import {
  validateForm,
  changeButtonState,
  changeErrorState,
  checkFormValid,
} from "./validate";

function openModalWindow(element, validateBool) {
  //Открытие модального окна и валидация при открытии
  //bool для отключения вывода ошибки при пустых полях на открытии
  element.classList.add("popup_opened");
  if (validateBool === true) {
    const bool = Array.from(
      element.querySelectorAll(".popup__text-input")
    ).every(function (input) {
      return input.value === "";
    });
    if (!bool) {
      validateForm({
        formName: element.querySelector(".popup__profile-form").name,
        submitButtonSelector: ".popup__save",
        inputSelector: ".popup__text-input",
      });
      element.querySelectorAll(".popup__text-input").forEach(function (input) {
        changeErrorState(input);
      });
    }
    changeButtonState(
      element.querySelector(".popup__save"),
      checkFormValid(
        element.querySelector(".popup__profile-form"),
        ".popup__text-input"
      )
    );
  }
  document.addEventListener("keydown", closeOnEsc);
}

function closeModalWindow(element) {
  //Закрытие модального окна
  element.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeOnEsc);
}

function closePopup(evt) {
  const currentPopupElement = document.querySelector(".popup_opened");
  if (
    evt.target === currentPopupElement.querySelector(".popup__close") ||
    evt.target === currentPopupElement ||
    evt.key === "Escape"
  ) {
    closeModalWindow(currentPopupElement);
  }
}

function closeOnEsc(evt) {
  closePopup(evt);
}

export { openModalWindow, closeModalWindow, closePopup, closeOnEsc };
