import { api } from "./api";

export const readingsService = {
  async getReadingsByUserId(userId) {
    const res = await api.get(`/readings?userId=${userId}`);
    return res.data;
  },

  async addReading(userId, type, cards) {
    const newReading = {
      userId,
      type,
      cards,
      createdAt: new Date().toISOString().split("T")[0], // YYYY-MM-DD
    };
    const res = await api.post("/readings", newReading);
    return res.data;
  },
};
