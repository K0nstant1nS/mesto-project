import {
  personNameElement,
  personAboutElement,
  profileAvatarImage,
} from "./variables";

function changeProfileInfo(data) {
  personNameElement.textContent = data.name;
  personAboutElement.textContent = data.about;
}

function changeProfileAvatar(url) {
  profileAvatarImage.src = url;
}

export { changeProfileAvatar, changeProfileInfo };
