import { initialCards } from "./scripts/cards.js";
import "../src/pages/index.css";
import {
  createCard,
  deletCard,
  likeButtonClick,
  likesCount,
} from "./components/card.js";
import {
  openPopup,
  closePopup,
  closeOverlay,
  popups,
} from "./components/modal.js";
import {
  checkingError,
  getUser,
  getCards,
  editProfile,
  postCard,
} from "./components/api.js";
import {
  showInputError,
  hideInputError,
  checkInputValidity,
  setEventListeners,
  toggleButtonState,
  hasInvalidInput,
  clearValidation,
} from "./components/validation.js";
import { data, error, event } from "jquery";

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
let coutLike = placeList.querySelector(".count__like");
nameInput.value = nameTitle.textContent;
jobInput.value = nameDecript.textContent;

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
// Редкатирование формы
const formElement = document.querySelector(".popup_type_edit");
const handleFormEditSubmit = (evt) => {
  evt.preventDefault();
  editProfile({
    name: nameInput.value,
    about: jobInput.value,
  }).then((data) => {
    nameTitle.textContent = data.name;
    nameDecript.textContent = data.about;
    closePopup(popupTypeEdit);
  });
};
formElement.addEventListener("submit", handleFormEditSubmit);

// Функция Добавления новых  карточек
const popupAddForm = document.querySelector(".popup_type_new-card");
function addNewCard(evt) {
  evt.preventDefault();
  postCard({
    name: nameInputs.value,
    link: linkInputs.value,
  });

  placeList.prepend(createCard(postCard, deletCard));
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

// 7 спринт

function enableValidation(validationConfig) {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationConfig);
  });
}

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);
clearValidation(formElement, validationConfig);

window.addEventListener("load", () => {
  Promise.all([getUser(), getCards()])
    .then(([user, cards]) => {
      // console.log(user); // { name: "John", age: 30 }
      function showCard(card) {
        card.forEach((item) => {
          const call = createCard(item, deletCard, openCardImage);
          placeList.append(call);
        });
        nameTitle.textContent = user.name;
        nameDecript.textContent = user.about;
      }

      showCard(cards);
    })
    .catch((error) => {
      console.log("Ошибка:", error);
    });
});
