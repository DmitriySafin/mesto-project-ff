export { openPopup, closePopup, closeOverlay };
const popups = Array.from(document.querySelectorAll(".popup"));

// Открытие  popup с карточками
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEscape);
  return popup;
}

// Функция закрытия popup
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEscape);
  return popup;
}

// Функция закрытия по overlay
function closeOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    popups.forEach((card) => {
      closePopup(card);
    });
  }
}

// Функция закрытия popup по Escp
function closeEscape(evt) {
  if (evt.key === "Escape") {
    popups.forEach((btn) => {
      btn.closest(".popup").classList.remove("popup_is-opened");
    });
  }
}
