import { initialCards } from "./scripts/cards.js";
import "../src/pages/index.css";
import {
  createCard,
  deletCard,
  likeButtonClick,
  likeCard,
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
  enableValidation,
  showInputError,
  hideInputError,
  checkInputValidity,
  setEventListeners,
  toggleButtonState,
  hasInvalidInput,
  clearValidation,
} from "./components/validation.js";
import { showSave,  resetButton} from "./components/utils.js";
import { data, error, event } from "jquery";

// Глобальные переменные
const placeList = document.querySelector(".places__list");
const popupCard = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const editBtn = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const addBtn = document.querySelector(".profile__add-button");
const imageProfile = document.querySelector(".profile__image");
const buttonOpenPopup = document.querySelectorAll('button[type="button"]');
const avatarPopup = document.querySelector(".popup_type_profile");
const nameTitle = document.querySelector(".profile__title");
const nameDecript = document.querySelector(".profile__description");
const nameInputs = document.querySelector(".popup__input_type_card-name");
const linkInputs = document.querySelector(".popup__input_type_url");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const popupInputProfile = document.querySelector(".popup__input_type_profile");
const popupImageText = document.querySelector(".popup__caption");
const formAvatar = document.querySelector("[name='avatar']");
const formAddCard = document.forms['new-place'];
const popupCloseAddCard = document.querySelector('.popup__close');

// Cлушатели на кнопки открытия popup
  buttonOpenPopup.forEach( buttonOpen =>{
    buttonOpen.addEventListener('click', (evt) =>{
      if (evt.target === editBtn) {
              openPopup(popupTypeEdit);
                nameInput.value = nameTitle.textContent;
  jobInput.value = nameDecript.textContent;
  clearValidation(popupTypeEdit, validationConfig);
            } else if (evt.target === addBtn) {
              
              openPopup(newCardPopup);
            } 
             else if (evt.target.classList.contains('popup__close')) {
              const popup = evt.target.closest('.popup');
              closePopup(popup);
            }
    })
    })  

    imageProfile.addEventListener("click", () => {
      openPopup(avatarPopup);
    });

// Обработчик по Overlay
popups.forEach((popup) => {
  popup.addEventListener("click", closeOverlay);
});


// Редкатирование формы
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
    .catch((error) => {
      console.error(error)
    })
    .finally(() => {
      resetButton(evt.submitter)
    });
};
popupTypeEdit.addEventListener("submit", handleFormEditSubmit);

// Обновление аватара пользователя
const changeAvatar = (evt) => {
  evt.preventDefault();
  showSave(evt.submitter);
  setUserAvatar({
    avatar: popupInputProfile.value,
  })
    .then((data) => {
      imageProfile.style.backgroundImage = `url(${data.avatar})`;
      closePopup(avatarPopup);
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => {
      resetButton(evt.submitter)
    });
};
formAvatar.addEventListener("submit", changeAvatar);
// Функция Добавления новых  карточек
function addnewCardPopup(evt) {
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
      closePopup(newCardPopup);
      evt.target.reset();
      clearValidation(formAddCard, validationConfig)
      closePopup(newCardPopup)
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => {
      resetButton(evt.submitter)
    });
}

newCardPopup.addEventListener("submit", addnewCardPopup);

// Открыте popup с картинкой
function openCardImage({ name, link }) {
  popupImage.src = link;
  popupImage.alt = name;
  popupImageText.textContent = name;
  openPopup(popupCard);
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

window.addEventListener("load", () => {
  Promise.all([getUser(), getCards()])
    .then(([user, cards]) => {
      function showCards(cardList) {
        const myId = user._id;
        cardList.forEach((item) => {
          const cardElement = createCard(
            item,
            myId,
            item._id,
            deletCard,
            openCardImage
          );
          placeList.append(cardElement);
        });
        nameTitle.textContent = user.name;
        nameDecript.textContent = user.about;
        imageProfile.style.backgroundImage = `url(${user.avatar})`;
      }
      showCards(cards);
    })
    .catch((error) => {
      console.error(error)
    })
});
