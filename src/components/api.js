const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-16",
  headers: {
    authorization: "dec5d51c-e797-4698-837e-5a0bd4b0f1d8",
    "Content-Type": "application/json",
  },
};

const getLikeDelete = function (cardObj) {
  return fetch(`${config.baseUrl}/cards/likes/${cardObj._id}`, {
    method: "DELETE",
    headers: {
      authorization: config.headers.authorization,
    },
  });
};

const getLikeAdded = function (cardObj) {
  return fetch(`${config.baseUrl}/cards/likes/${cardObj._id}`, {
    method: "PUT",
    headers: {
      authorization: config.headers.authorization,
    },
  });
};

const getProfileInfo = function () {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: {
      authorization: config.headers.authorization,
    },
  });
};

const getCardRemoved = function (cardObj) {
  return fetch(`${config.baseUrl}/cards/${cardObj._id}`, {
    method: "DELETE",
    headers: {
      authorization: config.headers.authorization,
    },
  });
};

const getCardsInit = function () {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: {
      authorization: config.headers.authorization,
    },
  });
};

const postCard = function (pictureNameInput, pictureLinkInput) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: pictureNameInput.value,
      link: pictureLinkInput.value,
    }),
  });
};

const patchAvatar = function (avatarImageInput) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarImageInput.value,
    }),
  });
};

const patchProfile = function (personNameInput, personAboutInput) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: personNameInput.value,
      about: personAboutInput.value,
    }),
  });
};

export {
  getLikeDelete,
  getLikeAdded,
  getProfileInfo,
  getCardsInit,
  getCardRemoved,
  patchAvatar,
  patchProfile,
  postCard,
};
