
const popups = Array.from(document.querySelectorAll(".popup"));
// Открытие  popup с карточками
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEscape);
}
// Функция закрытия popup
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEscape);
}

// Функция закрытия по overlay
function closeOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

// Функция закрытия popup по Escp
function closeEscape(evt) {
  if (evt.key === "Escape") {
    const target = popups.find((popup) =>
      popup.classList.contains("popup_is-opened")
    );
    closePopup(target);
  }
}

export { openPopup, closePopup, closeOverlay, popups };