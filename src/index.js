import { initialCards } from "./scripts/cards.js";
import "../src/pages/index.css";
import {
  createCard,
  deletCard,
  likeButtonClick,
  likeCard,
  showSave,
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
  removeCardLike,
  addCardLike,
  deleteCard,
  setUserAvatar,
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
const imageProfile = document.querySelector(".profile__image");
const popupProfile = document.querySelector(".popup_type_profile");
const closeButtons = Array.from(document.querySelectorAll(".popup__close"));
const nameTitle = document.querySelector(".profile__title");
const nameDecript = document.querySelector(".profile__description");
const nameInputs = document.querySelector(".popup__input_type_card-name");
const linkInputs = document.querySelector(".popup__input_type_url");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const popupInputProfile = document.querySelector(".popup__input_type_profile");
const popupImageText = document.querySelector(".popup__caption");

// Cлушатели на кнопки открытия popup
editBtn.addEventListener("click", () => {
  openPopup(popupTypeEdit);
});
addBtn.addEventListener("click", () => {
  openPopup(newCard);
});
imageProfile.addEventListener("click", () => {
  openPopup(popupProfile);
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
editBtn.addEventListener("click", () => {
  nameInput.value = nameTitle.textContent;
  jobInput.value = nameDecript.textContent;
  clearValidation(formElement, validationConfig);
});
// Редкатирование формы
const formElement = document.querySelector(".popup_type_edit");
const handleFormEditSubmit = (evt) => {
  evt.preventDefault();
  showSave(evt.submitter);
  editProfile({
    name: nameInput.value,
    about: jobInput.value,
  })
    .then((data) => {
      nameTitle.textContent = data.name;
      nameDecript.textContent = data.about;
      closePopup(popupTypeEdit);
    })
    .catch("Произошла ошибка", error);
};
formElement.addEventListener("submit", handleFormEditSubmit);
// Обновление аватара пользователя
const changeAvatar = (evt) => {
  evt.preventDefault();
  showSave(evt.submitter);
  setUserAvatar({
    avatar: popupInputProfile.value,
  })
    .then((data) => {
      console.log(data);
      imageProfile.style.backgroundImage = `url(${data.avatar})`;
      closePopup(popupProfile);
    })
    .catch("Аватар не загрузился", error);
};
popupProfile.addEventListener("submit", changeAvatar);
// Функция Добавления новых  карточек
const popupAddForm = document.querySelector(".popup_type_new-card");
function addNewCard(evt) {
  evt.preventDefault();
  showSave(evt.submitter);
  postCard({
    name: nameInputs.value,
    link: linkInputs.value,
  })
    .then((data) => {
      const cardId = data.owner._id;
      const userId = data._id;
      const cardElement = createCard(
        data,
        cardId,
        userId,
        deletCard,
        openCardImage
      );
      placeList.prepend(cardElement);
      closePopup(getActivePopup());
      nameInputs.value = "";
      linkInputs.value = "";
    })
    .catch((error) => {
      console.error(error);
      // Обработка ошибки при создании карточки
    });
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
      function showCard(card) {
        const myId = user._id;
        card.forEach((item) => {
          const call = createCard(
            item,
            myId,
            item._id,
            deletCard,
            openCardImage
          );
          placeList.append(call);
        });
        nameTitle.textContent = user.name;
        nameDecript.textContent = user.about;
        imageProfile.style.backgroundImage = `url(${user.avatar})`;
      }
      showCard(cards);
    })
    .catch((error) => {
      console.log("Ошибка:", error);
    });
});
