import { api } from "./api";

export const userService = {
  async getUserById(id) {
    const res = await api.get(`/users/${id}`);
    return res.data;
  },

  async login(email) {
    const res = await api.get(`/users?email=${email}`);
    return res.data[0];
  },
};
