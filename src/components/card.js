export { createCard, deletCard, placeItem, placeList, likeButtonClick };
// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
const popups = Array.from(document.querySelectorAll(".popup"));

// @todo: DOM узлы
const popupCard = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const placeList = document.querySelector(".places__list");
const placeItem = document.querySelectorAll(".places__item");

// @todo: Функция создания карточки
const createCard = (cardData, deleteCallback) => {
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
function deletCard(evt) {
  const delElem = evt.target.closest(".places__item");
  delElem.remove(placeItem);
}

// Функция Лайка на крточку
function likeButtonClick(like) {
  like.classList.toggle("card__like-button_is-active");
}
// Открытие  popup с карточками
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEscape);
  return popup;
}
// Открытие попап с картинками
function openCardImage({ name, link }) {
  popupImage.src = link;
  popupImage.alt = name;
  openPopup(popupCard);
}

// Функция закрытия popup по Escp
function closeEscape(evt) {
  if (evt.key === "Escape") {
    popups.forEach((btn) => {
      btn.closest(".popup").classList.remove("popup_is-opened");
    });
  }
}
