import { validateForm } from "./validate";

function openModalWindow(element, validateBool) {
  //Открытие модального окна
  element.classList.add("popup_opened");
  if (validateBool === true) {
    validateForm(element.querySelector("form"));
  }
  document.addEventListener("keydown", closeOnEsc);
}

function closeModalWindow(element) {
  //Закрытие модального окна
  element.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeOnEsc);
}

function closePopup(popup, evt) {
  if (
    evt.target === popup.querySelector(".popup__close") ||
    evt.target === popup ||
    evt.key === "Escape"
  ) {
    closeModalWindow(popup);
  }
}

function closeOnEsc(evt) {
  const currentPopupElement = document.querySelector(".popup_opened");
  closePopup(currentPopupElement, evt);
}

export { openModalWindow, closeModalWindow, closePopup, closeOnEsc };
