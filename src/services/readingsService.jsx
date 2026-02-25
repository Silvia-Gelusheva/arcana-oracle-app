import { get, push, ref, remove, set } from "firebase/database";

import { db } from "../firebase/firebaseConfig";

export async function getReadingsByUserId(userId) {
  if (!userId) return [];
  try {
    const snapshot = await get(ref(db, "readings"));
    if (!snapshot.exists()) return [];

    const allReadings = Object.entries(snapshot.val()).map(([id, val]) => ({
      id,
      ...val,
    }));

    return allReadings
      .filter((r) => r.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (err) {
    console.error("Error fetching readings:", err);
    return [];
  }
}

export async function addReading(userId, type, cards) {
  if (!userId || !Array.isArray(cards) || cards.length === 0) {
    console.error("Invalid parameters for addReading:", { userId, cards });
    return null;
  }

  const validCards = cards.map((c) => ({
    name: c.name || "No name",
    meaning: c.meaning || "No meaning",
    description: c.description || c.card_description || "No description",
    image: c.image || "",
  }));

  try {
    const newReadingRef = push(ref(db, "readings"));
    const newReading = {
      userId,
      type,
      cards: validCards,
      createdAt: new Date().toISOString(),
    };
    await set(newReadingRef, newReading);
    return { id: newReadingRef.key, ...newReading };
  } catch (err) {
    console.error("Error adding reading to Firebase:", err);
    return null;
  }
}

export async function deleteReading(readingId) {
  if (!readingId) return false;
  try {
    await remove(ref(db, `readings/${readingId}`));
    return true;
  } catch (err) {
    console.error("Error deleting reading:", err);
    return false;
  }
}

export async function getAllCards() {
  try {
    const snapshot = await get(ref(db, "cards"));
    if (!snapshot.exists()) return [];
    return Object.values(snapshot.val());
  } catch (err) {
    console.error("Error fetching cards:", err);
    return [];
  }
}

export async function getCardById(cardId) {
  if (!cardId) return null;
  try {
    const snapshot = await get(ref(db, `cards/${cardId}`));
    return snapshot.exists() ? snapshot.val() : null;
  } catch (err) {
    console.error("Error fetching card by ID:", err);
    return null;
  }
}

export async function getRandomCard() {
  try {
    const allCards = await getAllCards();
    if (!allCards.length) return null;
    const randomIndex = Math.floor(Math.random() * allCards.length);
    return allCards[randomIndex];
  } catch (err) {
    console.error("Error fetching random card:", err);
    return null;
  }
}
