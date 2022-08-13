
  //Отмена поведения по умолчанию для submit
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
  const buttonSavePerson = document.querySelector("#profile__edit .popup__save");
  const cardElementTemplate = document.querySelector("#card-template").content;
  const cardsContainerElement = document.querySelector(".places-cards");
  const imagePopupElement = document.querySelector("#image-popup");
  const formAddImage = document.querySelector("[name='card-form']");
  const formEditProfile = document.querySelector("[name='guest-form']");

  function formSubmitHandler (evt) {
      evt.preventDefault(); 
  }

  function resetForm (elem){
    elem.reset()
  }

  function openModalWindow(element){  //Открытие модального окна
    element.classList.add("popup_opened");
  }

  function closeModalWindow(element){  //Закрытие модального окна
    element.classList.remove("popup_opened");
  }

  function addOpenPopupEvent(element){  // Код для закрытия/открытия форм
    element.addEventListener("click",function(){
        const elemClassName = element.classList[0];
        const popupId = elemClassName.split("-")[0];
        const popupElement = document.querySelector("#" + popupId);
        openModalWindow(popupElement);
    })
}

function closePopup(elem){
  const popupClass = elem.dataset.target;
  const popupCloseReliteve = elem.closest("." + popupClass);
  closeModalWindow(popupCloseReliteve);
  popupCloseReliteve.querySelectorAll("input").forEach(function(item){
   return item.value = "";
  })
}

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
      likeButtonElement.classList.toggle("card__like_disabled")
      likeButtonElement.classList.toggle("card__like_active")
  })

  trashButtonElement.addEventListener("click",()=> trashButtonElement.parentElement.remove())

  cardImageElement.addEventListener("click",function(){
    prepareImagePopup(newCardElement,name,link)
  })

  return newCardElement
}


  addOpenPopupEvent(profileEditButton);
  addOpenPopupEvent(profileAddButton);




  buttonsCloseList.forEach(function(item){
    return item.addEventListener("click",()=>{
        closePopup(item)
    })
  })

// Код для внесения в value формы данных из profile__person



  

    formAddImage.addEventListener("submit", function(evt){
    formSubmitHandler(evt);
    const srcElemValue = personAddPopup.querySelector("[name='place-link']").value;
    const newCard = makeNewCard(personAddPopup.querySelector("[name='place-name']").value,srcElemValue);
    checkAndAddCard(newCard,srcElemValue);
    closeModalWindow(personAddPopup);
    resetForm(formAddImage);
  })

  formEditProfile.addEventListener("submit", function(evt){
    formSubmitHandler(evt);
    personNameElement.textContent = personNameInput.value;
    personAboutElement.textContent = personAboutInput.value;
    closeModalWindow(personEditPopup);
  })


  profileEditButton.addEventListener("click",function(){  //Получение значений при открытии popup
    personNameInput.value = personNameElement.textContent;
    personAboutInput.value = personAboutElement.textContent
  })

  //Заполнение places-cards

  initialCards.forEach(function(item){
    let link = item.link;
    checkAndAddCard(makeNewCard(item.name,link),link)
  })

//Добавление карточек через popup