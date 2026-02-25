import { get, getDatabase, ref } from "firebase/database";

import { db } from "../firebase/firebaseConfig";

export const shopService = {
    async getAllProducts() {
        try {
            const snapshot = await get(ref(db, "products"));
            if (!snapshot.exists()) return [];

            const data = snapshot.val();
            return Object.values(data);
        } catch (err) {
            console.error("Failed to fetch products:", err);
            return [];
        }
    },

    async getProductById(id) {
        try {
            const snapshot = await get(ref(db, `products/${id}`));
            return snapshot.exists() ? snapshot.val() : null;
        } catch (err) {
            console.error(`Failed to fetch product ${id}:`, err);
            return null;
        }
    },
};