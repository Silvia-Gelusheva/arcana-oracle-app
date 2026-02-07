import { api } from "./api";

export const shopService = {
    async getAllProducts() {
        const res = await api.get("/products");
        return res.data;
    },

    async getProductById(id) {
        const res = await api.get(`/products/${id}`);
        return res.data;
    },
};
