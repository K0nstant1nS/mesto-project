import { getCardsInit } from "./api";

export const initialCards = getCardsInit().then((data) => data.json());
