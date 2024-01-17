// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placeList = document.querySelector(".places__list");
const placeItem = document.querySelector(".places__item");

// @todo: Функция создания карточки
const createCard = (cardData, deleteCallback) => {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  const deletBtn = cardElement.querySelector(".card__delete-button");
  deletBtn.addEventListener("click", deleteCallback);
  return cardElement;
};

// // @todo: Функция удаления карточки
function deletCard(evt) {
  const delElem = evt.target.closest(".places__item");
  delElem.remove(placeItem);
}
// // @todo: Функция показа карточки
function showCard(card) {
  card.forEach((item) => {
    const call = createCard(item, deletCard);
    placeList.append(call);
  });
}

showCard(initialCards);
