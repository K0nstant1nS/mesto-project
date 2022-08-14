
  //Отмена поведения по умолчанию для submit
  const popupElementsList = document.querySelectorAll(".popup");
  const buttonSaveElementsList = document.querySelectorAll(".popup__save");
  const personAddPopup = document.querySelector("#profile__add");
  const personEditPopup = document.querySelector("#profile__edit");
  const personEditPopupSubmit = personEditPopup.querySelector(".popup__save");
  const personAddPopupSubmit = personAddPopup.querySelector(".popup__save");
  const buttonsCloseList = document.querySelectorAll(".popup__close");
  const profileEditButton = document.querySelector(".profile__edit-button");
  const profileAddButton = document.querySelector(".profile__add-button");
  const personNameElement = document.querySelector(".profile__name");
  const personAboutElement = document.querySelector(".profile__about");
  const personNameInput = document.querySelector("[name='guest-name']");
  const personAboutInput = document.querySelector("[name='guest-about']");
  const cardElementTemplate = document.querySelector("#card-template").content;
  const cardsContainerElement = document.querySelector(".places-cards");
  const imagePopupElement = document.querySelector("#image-popup");
  const formAddImage = document.querySelector("[name='card-form']");
  const formEditProfile = document.querySelector("[name='guest-form']");

  function openModalWindow(element){  //Открытие модального окна
    element.classList.add("popup_opened");
  }

  function closeModalWindow(element){  //Закрытие модального окна
    element.classList.remove("popup_opened");
  }

  /*function addOpenPopupEvent(element){  // Код для закрытия/открытия форм
    element.addEventListener("click",function(){
        const elemClassName = element.classList[0];
        const popupId = elemClassName.split("-")[0];
        const popupElement = document.querySelector("#" + popupId);
        openModalWindow(popupElement);
    })
} */

function checkAndAddCard(card,src){ //Проверка и добавление карточки
  const img = new Image();
  img.onload = function(){
    cardsContainerElement.prepend(card);
  };
  img.src = src;
}

function prepareImagePopup(cardElem,name,link){  // Внесение данных в моальное окно с изображением
    imagePopupElement.querySelector(".popup__image-title").textContent = name;
    imagePopupElement.querySelector(".popup__image").src = link;
    imagePopupElement.querySelector(".popup__image").alt = "Фотография " + name;
    openModalWindow(imagePopupElement);
}

function makeNewCard(name,link){  //Создание карточки
  const newCardElement = cardElementTemplate.cloneNode(true);
  const likeButtonElement = newCardElement.querySelector(".card__like");
  const trashButtonElement = newCardElement.querySelector(".card__trash");
  const cardImageElement = newCardElement.querySelector(".card__image");
  cardImageElement.alt = "Фотография " + name;
  cardImageElement.src = link;
  newCardElement.querySelector(".card__caption").textContent = name;

  likeButtonElement.addEventListener("click",()=>{
      likeButtonElement.classList.toggle("card__like_active");
  })

  trashButtonElement.addEventListener("click",()=> trashButtonElement.parentElement.remove())

  cardImageElement.addEventListener("click",function(){
    prepareImagePopup(newCardElement,name,link)
  })

  return newCardElement
}

  popupElementsList.forEach(function(item){
    item.classList.add("popup_type_animated")
  })


  initialCards.forEach(function(item){ //Создаём карточки переданные в объекте
  let link = item.link;
  checkAndAddCard(makeNewCard(item.name,link),link)
  })

  profileEditButton.addEventListener("click",function(){
    openModalWindow(personEditPopup)
  })
  profileAddButton.addEventListener("click",function(){
    openModalWindow(personAddPopup)
  })


  buttonsCloseList.forEach(function(item){  //Добавление обработчика для закрытия popup
    return item.addEventListener("click",()=>{
      const currentPopupElement = document.querySelector(".popup_opened");
      closeModalWindow(currentPopupElement);
    })
  })




  formAddImage.addEventListener("submit", function(evt){  //Добавление карточки через popup
    evt.preventDefault();
    const srcElemValue = personAddPopup.querySelector("[name='place-link']").value;
    const newCard = makeNewCard(personAddPopup.querySelector("[name='place-name']").value,srcElemValue);
    checkAndAddCard(newCard,srcElemValue);
    closeModalWindow(personAddPopup);
    formAddImage.reset();
  })

  formEditProfile.addEventListener("submit", function(evt){  // Изменение профиля
    evt.preventDefault();
    personNameElement.textContent = personNameInput.value;
    personAboutElement.textContent = personAboutInput.value;
    closeModalWindow(personEditPopup);
  })


  profileEditButton.addEventListener("click",function(){  //Получение значений при открытии popup
    personNameInput.value = personNameElement.textContent;
    personAboutInput.value = personAboutElement.textContent
  })