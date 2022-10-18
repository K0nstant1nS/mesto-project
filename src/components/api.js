const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-16",
  headers: {
    authorization: "dec5d51c-e797-4698-837e-5a0bd4b0f1d8",
    "Content-Type": "application/json",
  },
};

function dataParse(data) {
  if (data.ok) {
    return data.json();
  } else {
    return Promise.reject(`Ошибка. Статус - ${data.status}`);
  }
}

const getLikeDelete = function (cardObj) {
  return fetch(`${config.baseUrl}/cards/likes/${cardObj._id}`, {
    method: "DELETE",
    headers: {
      authorization: config.headers.authorization,
    },
  })
    .then(dataParse)
    .catch((err) => {
      console.log(err);
    });
};

const getLikeAdded = function (cardObj) {
  return fetch(`${config.baseUrl}/cards/likes/${cardObj._id}`, {
    method: "PUT",
    headers: {
      authorization: config.headers.authorization,
    },
  })
    .then(dataParse)
    .catch((err) => {
      console.log(err);
    });
};

const getProfileInfo = function () {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: {
      authorization: config.headers.authorization,
    },
  })
    .then(dataParse)
    .catch((err) => {
      console.log(err);
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

const initialCards = function () {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: {
      authorization: config.headers.authorization,
    },
  })
    .then(dataParse)
    .catch((err) => {
      console.log(err);
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
  })
    .then(dataParse)
    .catch((err) => {
      console.log(err);
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
  initialCards,
  getCardRemoved,
  patchAvatar,
  patchProfile,
  postCard,
};
