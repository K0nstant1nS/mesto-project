function openModalWindow(element) {
  element.classList.add("popup_opened");
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
