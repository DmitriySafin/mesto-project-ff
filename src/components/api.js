import { data } from "jquery";
const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-7",
  headers: {
    authorization: "d3795eab-d85f-4915-a844-3482cd44d1d6",
    "Content-Type": "application/json",
  },
};
// Проверка на ошибки
function checkReponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    Promise.reject(`Ошибка: ${res.status}`);
  }
}
//   Загрузка информации о пользователе с сервера
const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkReponse);
};

//   Загрузка карточек с сервера
const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkReponse);
};

// Редактирование профиля
const editProfile = (profile) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(profile),
  }).then(checkReponse);
};

// Добавление новой карточки

const postCard = (item) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: item.name,
      link: item.link,
    }),
  }).then(checkReponse);
};

// Удаление карточки
const deleteCard = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkReponse);
};
// Постановка лайка
const addCardLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkReponse);
};

// Снятие лайка
const removeCardLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkReponse);
};

// Обновление аватара пользователя

const setUserAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(avatar),
  }).then(checkReponse);
};

export {
  checkReponse,
  getUser,
  getCards,
  editProfile,
  postCard,
  removeCardLike,
  addCardLike,
  deleteCard,
  setUserAvatar,
};