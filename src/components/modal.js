import { validateForm } from "./validate";

function openModalWindow(element, validateBool) {
  //Открытие модального окна
  element.classList.add("popup_opened");
  if (validateBool === true) {
    validateForm(element.querySelector("form"));
  }
}

function closeModalWindow(element) {
  //Закрытие модального окна
  element.classList.remove("popup_opened");
}

function closePopup(popup, evt) {
  if (
    evt.target === popup.querySelector(".popup__close") ||
    evt.target === popup ||
    evt.key === "Escape"
  ) {
    popup.classList.remove("popup_opened");
  }
}

export { openModalWindow, closeModalWindow, closePopup };
