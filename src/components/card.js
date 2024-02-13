// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: Функция создания карточки
export const createCard = (cardData, deleteCallback, openCardImage) => {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  const cardImage = cardElement.querySelector(".card__image");
  const deletBtn = cardElement.querySelector(".card__delete-button");
  const like = cardElement.querySelector(".card__like-button");
  deletBtn.addEventListener("click", deleteCallback);
  const openPopupImage = () => openCardImage(cardData);
  cardImage.addEventListener("click", openPopupImage);
  const likeButton = () => likeButtonClick(like);
  like.addEventListener("click", likeButton);
  return cardElement;
};

// // @todo: Функция удаления карточки
export function deletCard(evt) {
  const delElem = evt.target.closest(".places__item");
  delElem.remove("places__item");
}

// Функция Лайка на крточку
export function likeButtonClick(like) {
  like.classList.toggle("card__like-button_is-active");
}
