import { initialCards } from "./scripts/cards.js";
import "../src/pages/index.css";
import { event } from "jquery";
// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
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
// // @todo: Функция показа карточки
function showCard(card) {
  card.forEach((item) => {
    const call = createCard(item, deletCard);
    placeList.append(call);
  });
}

showCard(initialCards);

// Глобальные переменные
const editBtn = document.querySelector(".profile__edit-button");
const popuptypeEdit = document.querySelector(".popup_type_edit");
const newCard = document.querySelector(".popup_type_new-card");
const addBtn = document.querySelector(".profile__add-button");
const popups = Array.from(document.querySelectorAll(".popup"));
const close = Array.from(document.querySelectorAll(".popup__close"));
let nameTitle = document.querySelector(".profile__title");
let nameDecript = document.querySelector(".profile__description");
const popupCard = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");

// Открытие  popup с карточками
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEscape);
  return popup;
}
editBtn.addEventListener("click", () => {
  openPopup(popuptypeEdit);
});
addBtn.addEventListener("click", () => {
  openPopup(newCard);
});

// Открытие попап с картинками
function openCardImage({ name, link }) {
  popupImage.src = link;
  popupImage.alt = name;
  openPopup(popupCard);
}

// Функция закрытия popup
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEscape);
  return popup;
}
close.forEach((btn) => {
  btn.addEventListener("click", (evt) => {
    const delPopup = evt.target.closest(".popup");
    closePopup(delPopup);
  });
});

// Функция закрытия по overlay
function closeOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    popups.forEach((card) => {
      closePopup(card);
    });
  }
}
popups.forEach((card) => {
  card.addEventListener("click", closeOverlay);
});

// Функция закрытия popup по Escp
function closeEscape(evt) {
  if (evt.key === "Escape") {
    popups.forEach((btn) => {
      btn.closest(".popup").classList.remove("popup_is-opened");
    });
  }
}

// функция для определения попапа, который открыт в данный момент
function getActivePopup(target) {
  return (target = popups.find((popup) =>
    popup.classList.contains("popup_is-opened")
  ));
}

// Функция Лайка на крточку
function likeButtonClick(like) {
  like.classList.toggle("card__like-button_is-active");
}

// Редактирование профиля (Форма)
const formElement = document.forms[0];
let nameInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_description");
nameInput.value = nameTitle.textContent;
jobInput.value = nameDecript.textContent;
function handleFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const decription = jobInput.value;
  nameTitle.textContent = name;
  nameDecript.textContent = decription;
  const target = getActivePopup();
  closePopup(target);
}
formElement.addEventListener("submit", handleFormSubmit);

// Функция Добавления новых  карточек
const popupAddForm = document.forms[1];
const nameInputs = document.querySelector(".popup__input_type_card-name");
const linkInputs = document.querySelector(".popup__input_type_url");
function addNewCard(evt) {
  evt.preventDefault();
  const card = {
    name: nameInputs.value,
    link: linkInputs.value,
  };
  placeList.prepend(createCard(card, deletCard));
  closePopup(getActivePopup());
  nameInputs.value = "";
  linkInputs.value = "";
}
popupAddForm.addEventListener("submit", addNewCard);
