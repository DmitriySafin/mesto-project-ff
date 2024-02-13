import { initialCards } from "./scripts/cards.js";
import "../src/pages/index.css";
import { createCard, deletCard, likeButtonClick } from "./components/card.js";
import {
  openPopup,
  closePopup,
  closeOverlay,
  popups,
} from "./components/modal.js";
import { event } from "jquery";

// Глобальные переменные
const placeList = document.querySelector(".places__list");
const popupCard = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const editBtn = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const newCard = document.querySelector(".popup_type_new-card");
const addBtn = document.querySelector(".profile__add-button");
const closeButtons = Array.from(document.querySelectorAll(".popup__close"));
const nameTitle = document.querySelector(".profile__title");
const nameDecript = document.querySelector(".profile__description");
const nameInputs = document.querySelector(".popup__input_type_card-name");
const linkInputs = document.querySelector(".popup__input_type_url");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const popupImageText = document.querySelector(".popup__caption");
nameInput.value = nameTitle.textContent;
jobInput.value = nameDecript.textContent;

// // @todo: Cоздания DOM-узла карточки
function showCard(card) {
  card.forEach((item) => {
    const call = createCard(item, deletCard, openCardImage);
    placeList.append(call);
  });
}

showCard(initialCards);

// Cлушатели на кнопки открытия popup
editBtn.addEventListener("click", () => {
  openPopup(popupTypeEdit);
});
addBtn.addEventListener("click", () => {
  openPopup(newCard);
});

closeButtons.forEach((btn) => {
  btn.addEventListener("click", (evt) => {
    const delPopup = evt.target.closest(".popup");
    closePopup(delPopup);
  });
});

// Обработчик по Overlay
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
const formElement = document.querySelector(".popup_type_edit");
function handleFormEditSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const decription = jobInput.value;
  nameTitle.textContent = name;
  nameDecript.textContent = decription;
  closePopup(popupTypeEdit);
}
formElement.addEventListener("submit", handleFormEditSubmit);

// Функция Добавления новых  карточек
const popupAddForm = document.querySelector(".popup_type_new-card");
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

// Открыте popup с картинкой
function openCardImage({ name, link }) {
  popupImage.src = link;
  popupImage.alt = name;
  popupImageText.textContent = name;
  openPopup(popupCard);
}
