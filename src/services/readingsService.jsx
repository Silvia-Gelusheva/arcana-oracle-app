import { get, push, ref, remove, set } from "firebase/database";

import { db } from "../firebase/firebaseConfig";

let cachedCards = null;

export async function getAllCards() {
  if (cachedCards) return cachedCards;
  try {
    const snapshot = await get(ref(db, "cards"));
    if (!snapshot.exists()) return [];
    cachedCards = Object.values(snapshot.val());
    return cachedCards;
  } catch (err) {
    console.error("Error fetching all cards:", err);
    return [];
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

export async function addReading(userId, type, cards) {
  if (!userId || !Array.isArray(cards) || cards.length === 0) {
    console.warn("Invalid parameters for addReading", { userId, cards });
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
    console.error("Error adding reading:", err);
    return null;
  }
}

export async function getReadingsByUserId(userId) {
  try {
    const snapshot = await get(ref(db, `readings`));
    if (!snapshot.exists()) return [];

    const allReadings = Object.entries(snapshot.val()).map(([id, reading]) => ({
      id,
      ...reading,
    }));
    return allReadings.filter((r) => r.userId === userId);
  } catch (err) {
    console.error("Failed to fetch readings:", err);
    return [];
  }
}

export async function deleteReading(readingId) {
  try {
    await remove(ref(db, `readings/${readingId}`));
  } catch (err) {
    console.error("Failed to delete reading:", err);
    throw err;
  }
}
