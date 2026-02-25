import { get, push, ref, set } from "firebase/database";

import { db } from "../firebase/firebaseConfig";

export const cartService = {
  async getCartByUserId(userId) {
    try {
      const snapshot = await get(ref(db, `carts/${userId}`));
      if (!snapshot.exists()) return { id: userId, userId, items: [] };
      return { id: userId, userId, items: snapshot.val().items || [] };
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      return { id: userId, userId, items: [] };
    }
  },

  async updateCart(cart) {
    try {
      await set(ref(db, `carts/${cart.userId}`), cart);
      return cart;
    } catch (err) {
      console.error("Failed to update cart:", err);
      return cart;
    }
  },
};
