import { initialCards } from "./scripts/cards.js";
import "../src/pages/index.css";
import {
  createCard,
  deletCard,
  placeItem,
  placeList,
  likeButtonClick,
} from "./components/card.js";
import {
  openPopup,
  closePopup,
  closeOverlay,
  closeEscape,
} from "./components/modal.js";
import { event } from "jquery";

// Глобальные переменные
const editBtn = document.querySelector(".profile__edit-button");
const popuptypeEdit = document.querySelector(".popup_type_edit");
const newCard = document.querySelector(".popup_type_new-card");
const addBtn = document.querySelector(".profile__add-button");
const popups = Array.from(document.querySelectorAll(".popup"));
const close = Array.from(document.querySelectorAll(".popup__close"));
let nameTitle = document.querySelector(".profile__title");
let nameDecript = document.querySelector(".profile__description");
const nameInputs = document.querySelector(".popup__input_type_card-name");
const linkInputs = document.querySelector(".popup__input_type_url");
let nameInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_description");
nameInput.value = nameTitle.textContent;
jobInput.value = nameDecript.textContent;

// // @todo: Cоздания DOM-узла карточки
function showCard(card) {
  card.forEach((item) => {
    const call = createCard(item, deletCard);
    placeList.append(call);
  });
}

showCard(initialCards);

// Cлушатели на кнопки открытия popup
editBtn.addEventListener("click", () => {
  openPopup(popuptypeEdit);
});
addBtn.addEventListener("click", () => {
  openPopup(newCard);
});

close.forEach((btn) => {
  btn.addEventListener("click", (evt) => {
    const delPopup = evt.target.closest(".popup");
    closePopup(delPopup);
  });
});

// Обработчик на закрытие по overlay
popups.forEach((card) => {
  card.addEventListener("click", closeOverlay);
});

// функция для определения попапа, который открыт в данный момент
function getActivePopup(target) {
  return (target = popups.find((popup) =>
    popup.classList.contains("popup_is-opened")
  ));
}

// Редактирование профиля (Форма)
const formElement = document.forms[0];
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
