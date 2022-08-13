
  //Отмена поведения по умолчанию для submit
  const buttonSaveElementsList = document.querySelectorAll(".popup__save");
  const personAddPopup = document.querySelector("#profile__add");
  const cardAddButtonElement = personAddPopup.querySelector(".popup__save");
  const buttonsCloseList = document.querySelectorAll(".popup__close");
  const profileEditButton = document.querySelector(".profile__edit-button");
  const profileAddButton = document.querySelector(".profile__add-button");
  const personNameElement = document.querySelector(".profile__name");
  const personAboutElement = document.querySelector(".profile__about");
  const personNameInput = document.querySelector("[name='guest-name']");
  const personAboutInput = document.querySelector("[name='guest-about']");
  const personEditPopup = document.querySelector("#profile__edit");
  const buttonSavePerson = document.querySelector("#profile__edit .popup__save");
  const cardElementTemplate = document.querySelector("#card-template").content;
  const cardsContainerElement = document.querySelector(".places-cards");
  const imagePopupElement = document.querySelector("#image-popup");

  function formSubmitHandler (evt) {
      evt.preventDefault(); 
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

function prepareImagePopup(cardElem,name,link){
    imagePopupElement.querySelector(".popup__image-title").textContent = name;
    imagePopupElement.querySelector(".popup__image").src = link;
    openModalWindow(imagePopupElement);
}

  buttonSaveElementsList.forEach(function(item){
      return item.addEventListener("click", formSubmitHandler)
  })

  function makeNewCard(name,link){  //Создание карточки
    const img = new Image();
    img.onload = function(){
      const newCardElement = cardElementTemplate.cloneNode(true);
      const likeButtonElement = newCardElement.querySelector(".card__like");
      const trashButtonElement = newCardElement.querySelector(".card__trash");
      const cardImageElement = newCardElement.querySelector(".card__image");
      cardImageElement.alt = "Фотография " + name;
      cardImageElement.src = link; //initialCards[i].link;
      newCardElement.querySelector(".card__caption").textContent = name;
      likeButtonElement.addEventListener("click",()=>{
          likeButtonElement.classList.toggle("card__like_disabled")
          likeButtonElement.classList.toggle("card__like_active")
      })
      trashButtonElement.addEventListener("click",()=> trashButtonElement.parentElement.remove())
      cardImageElement.addEventListener("click",function(){
        prepareImagePopup(newCardElement,name,link)
      })
      cardsContainerElement.prepend(newCardElement);
    };
    img.src = link;
  }


  addOpenPopupEvent(profileEditButton);
  addOpenPopupEvent(profileAddButton);


  buttonsCloseList.forEach(function(item){
    return item.addEventListener("click",()=>{
        closePopup(item)
    })
  })

// Код для внесения в value формы данных из profile__person


  profileEditButton.addEventListener("click",function(){  //Получение значений при открытии popup
    personNameInput.value = personNameElement.textContent;
    personAboutInput.value = personAboutElement.textContent
  })

  buttonSavePerson.addEventListener("click",function(){  //Перенос значений value в профиль
      personNameElement.textContent = personNameInput.value;
      personAboutElement.textContent = personAboutInput.value;
      closeModalWindow(personEditPopup);
  })

  //Заполнение places-cards

  for(let i = 0; i < initialCards.length; i++){
      makeNewCard(initialCards[i].name,initialCards[i].link)
  }

//Добавление карточек через popup


  cardAddButtonElement.addEventListener("click",function(){
      const inputPlaceNameElement = document.querySelector("[name='place-name']");
      const inputPlaceLinkElement = document.querySelector("[name='place-link']");
      makeNewCard(inputPlaceNameElement.value ,inputPlaceLinkElement.value)
      closeModalWindow(personAddPopup);
      inputPlaceNameElement.value = "";
      inputPlaceLinkElement.value = "";
  })