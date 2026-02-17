import { api } from "./api";

export async function getReadingsByUserId(userId) {
  const res = await api.get(`/readings?userId=${userId}`);
  return res.data;
}

export async function addReading(userId, type, cards) {
  const newReading = {
    userId,
    type,
    cards,
    createdAt: new Date().toISOString().split("T")[0], // YYYY-MM-DD
  };
  const res = await api.post("/readings", newReading);
  console.log("addReading", newReading);

  return res.data;
}

export async function getAllCards() {
  const res = await api.get("/cards");
  return res.data;
}

export async function getCardById(cardId) {
  const res = await api.get(`/cards/${cardId}`);
  return res.data;
}
export async function getRandomCard() {
  const res = await api.get("/cards");
  const cards = res.data;
  const randomIndex = Math.floor(Math.random() * cards.length);
  return cards[randomIndex];
}
export async function deleteReading(readingId) {
  const res = await api.delete(`/readings/${readingId}`);
  return res.data;
}
