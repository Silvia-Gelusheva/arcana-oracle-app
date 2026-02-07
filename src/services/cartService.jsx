import { api } from "./api";

export const cartService = {
  async getCartByUserId(userId) {
    const res = await api.get(`/cart?userId=${userId}`);
    return res.data[0] || { userId, items: [] };
  },

  async updateCart(cart) {
    await api.put(`/cart/${cart.id}`, cart);
    return cart;
  },
};
