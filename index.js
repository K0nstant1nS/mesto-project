
  //Отмена поведения по умолчанию для submit
  const buttonSaveElementsList = document.querySelectorAll(".popup__save");

  function formSubmitHandler (evt) {
      evt.preventDefault(); 
  }

  buttonSaveElementsList.forEach(function(item){
      return item.addEventListener("click", formSubmitHandler)
  })

// Код для закрытия/открытия форм
  const buttonsCloseList = document.querySelectorAll(".popup__close");
  const popupElements = document.querySelectorAll(".popup");
  const profileEditButton = document.querySelector(".profile__edit-button");
  const profileAddButton = document.querySelector(".profile__add-button");

  function addOpenPopupEvent(element){
      element.addEventListener("click",function(){
          const elemClassName = element.classList[0];
          const popupId = elemClassName.split("-")[0];
          const popupElement = document.querySelector("#" + popupId);
          popupElement.classList.add("popup_opened");
      })
  }

  addOpenPopupEvent(profileEditButton);
  addOpenPopupEvent(profileAddButton);

  function closePopup(elem){
    let popupClass = elem.dataset.target;
    if(popupClass){
        elem.closest("." + popupClass).classList.remove("popup_opened")
    } else {
        elem.classList.remove("popup_opened")
    }
  }

  function checkPopupEvevntTarget(evt){
    if(evt.target.classList[0] === "popup"||evt.target.classList[0] === "popup__close"){
        closePopup(evt.target);
    } else {
        return
    }
  }

  popupElements.forEach(function(item){
    return item.addEventListener("click",checkPopupEvevntTarget)
  })

 /* function closePopup(elem){
    let popupClass = "." + elem.dataset.target;
    elem.closest(popupClass).classList.remove("popup_opened")
  }

  buttonsCloseList.forEach(function(item){
    return item.addEventListener("click", function(){
        closePopup(item)
    })
 }); */

  /*buttonsCloseList.forEach(function(item){
     return item.addEventListener("click", function(){
      item.parentElement.parentElement.classList.remove("popup_opened")
     })
  }); */

// Код для внесения в value формы данных из profile__person
  const personNameElement = document.querySelector(".profile__name");
  const personAboutElement = document.querySelector(".profile__about");
  const personNameInput = document.querySelector("[name='guest-name']");
  const personAboutInput = document.querySelector("[name='guest-about']");
  const personEditPopup = document.querySelector("#profile__edit");
  const buttonSavePerson = document.querySelector("#profile__edit .popup__save");

  buttonSavePerson.addEventListener("click",function(){
      personNameElement.textContent = personNameInput.value;
      personAboutElement.textContent = personAboutInput.value;
      personEditPopup.classList.remove("popup_opened")
  })

  //Заполнение places-cards

  const cardElementTemplate = document.querySelector("#card-template").content;
  const cardsContainerElement = document.querySelector(".places-cards");


  const initialCards = [
{
name: 'Архыз',
link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
},
{
name: 'Челябинская область',
link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
},
{
name: 'Иваново',
link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
},
{
name: 'Камчатка',
link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
},
{
name: 'Холмогорский район',
link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
},
{
name: 'Байкал',
link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}
];



  function makeNewCard(name,link){
      const newCardElement = cardElementTemplate.cloneNode(true);
      const likeButtonElement = newCardElement.querySelector(".card__like");
      const trashButtonElement = newCardElement.querySelector(".card__trash");
      const popupImageElement = newCardElement.querySelector(".popup__image");
      const popupCardElement = newCardElement.querySelector('.popup');
      const popupCloseElement = newCardElement.querySelector('.popup__close');
      likeButtonElement.addEventListener("click",()=>{
          likeButtonElement.classList.toggle("card__like_disabled")
          likeButtonElement.classList.toggle("card__like_active")
      })
      trashButtonElement.addEventListener("click",()=> trashButtonElement.parentElement.remove())
      newCardElement.querySelector(".card__image").src = link; //initialCards[i].link;
      newCardElement.querySelector(".card__caption").textContent = name; //initialCards[i].name;
      popupImageElement.src = link;
      popupImageElement.parentElement.style.position = "relative";
      //popupCloseElement.addEventListener("click",checkPopupEvevntTarget);
      popupCardElement.addEventListener("click",checkPopupEvevntTarget)
      newCardElement.querySelector(".card__image").addEventListener("click",function(){
          popupImageElement.parentElement.parentElement.classList.add("popup_opened")
      })
      cardsContainerElement.append(newCardElement);
      }

  for(let i = 0; i < initialCards.length; i++){
      makeNewCard(initialCards[i].name,initialCards[i].link)
  }


//Добавление карточек через popup
  const personAddPopup = document.querySelector("#profile__add");
  const cardAddButtonElement = personAddPopup.querySelector(".popup__save");


  cardAddButtonElement.addEventListener("click",function(){
      const inputPlaceNameElement = document.querySelector("[name='place-name']");
      const inputPlaceLinkElement = document.querySelector("[name='place-link']");
      makeNewCard(inputPlaceNameElement.value ,inputPlaceLinkElement.value)
      personAddPopup.classList.remove("popup_opened");
      inputPlaceNameElement.value = '';
      inputPlaceLinkElement.value = '';
  })