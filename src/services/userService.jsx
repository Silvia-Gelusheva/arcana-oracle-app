import { api } from "./api";

// register -> email, password, username
// login -> email, password
// updateProfile -> phone, address, avatar
// getUserById
//change password

export const userService = {
  async register({ email, password, username }) {
    const existing = await api.get(`/users?email=${email}`);

    if (existing.data.length > 0) {
      throw new Error("User already exists");
    }

    const newUser = {
      username,
      email,
      password,
      phone: "",
      avatar: "",
      address: {
        street: "",
        city: "",
        country: "",
      },
      createdAt: Date.now(),
    };

    const res = await api.post("/users", newUser);

    return res.data;
  },

  async login(email, password) {
    const res = await api.get(`/users?email=${email}&password=${password}`);

    const user = res.data[0];

    if (!user) {
      throw new Error("Invalid email or password");
    }

    return user;
  },

  async updateProfile(userId, data) {
    const current = await api.get(`/users/${userId}`);

    const merged = {
      ...current.data,
      ...data,

      avatar: data.avatar !== undefined ? data.avatar : current.data.avatar,
      address: {
        ...(current.data.address || {}),
        ...(data.address || {}),
      },
    };

    const res = await api.put(`/users/${userId}`, merged);

    return res.data;
  },

  async getUserById(id) {
    const res = await api.get(`/users/${id}`);
    return res.data;
  },

  async changePassword(userId, currentPassword, newPassword) {
    const res = await api.get(`/users/${userId}`);
    const user = res.data;

    if (user.password !== currentPassword) {
      throw new Error("Current password is incorrect");
    }

    const updatedUser = {
      ...user,
      password: newPassword,
    };

    const updateRes = await api.put(`/users/${userId}`, updatedUser);

    return updateRes.data;
  },
};
