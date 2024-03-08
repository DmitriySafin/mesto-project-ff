import { data } from "jquery";
import { closePopup, openPopup } from "./modal";
import { deleteCard, addCardLike, removeCardLike } from "./api";
// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: Функция создания карточки
export const createCard = (
  cardData,
  userId,
  cardId,
  deleteCallback,
  openCardImage
) => {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  const deletBtn = cardElement.querySelector(".card__delete-button");

  const like = cardElement.querySelector(".card__like-button");
  like.addEventListener("click", () => { 
    likeCard(cardId, like, countLike); 
  });  
  
  const renderLikes = (card) =>{
    if (card.likes.some(card=>card._id === userId)) {
      like.classList.add("card__like-button_is-active")
    }
  }
  
renderLikes(cardData);

  const openPopupImage = () => openCardImage(cardData);
  cardImage.addEventListener("click", openPopupImage);
  const likeButton = () => likeButtonClick(like);
  like.addEventListener("click", likeButton);


  if (cardData.owner._id === userId) { 
    deletBtn.addEventListener("click", () => { 
      deleteCard(cardId).then(()=>{
        deleteCallback(cardElement)
      })
      .catch(console.error)
    }); 
  } else { 
    deletBtn.remove(); 
  } 
  const countLike = cardElement.querySelector(".count__like");
  countLike.textContent = cardData.likes.length;
  return cardElement;
};
// // @todo: Функция удаления карточки
export function deletCard(cardElement) {
  cardElement.remove();
}

// Функция Лайка на крточку
export function likeButtonClick(like) {
  like.classList.toggle("card__like-button_is-active");
}

// Постановка и снятие лайка
export const likeCard = (cardId, likeButton, likeCounter) => {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    removeCardLike(cardId)
      .then((data) => {
        likeButton.classList.remove("card__like-button_is-active");
        likeCounter.textContent = data.likes.length;
      })
      .catch(console.error);
  } else {
    addCardLike(cardId)
      .then((data) => {
        likeButton.classList.add("card__like-button_is-active");
        likeCounter.textContent = data.likes.length;
      })
      .catch(console.error);
  }
};
