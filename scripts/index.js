// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const placeList = document.querySelector(".places__list");
// @todo: Функция создания карточки
initialCards.forEach(function (item) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  cardElement.querySelector(".card__image").src = item.link;
  cardElement.querySelector(".card__title").textContent = item.name;
  placeList.append(cardElement);
});
// @todo: Функция удаления карточки
document.querySelector(".places").addEventListener("click", (evt) => {
  console.log(evt.target);
  if (evt.target.className != "card__delete-button") return;
  let item = evt.target.closest(".places__item");
  item.remove();
});
