import { get, ref, set, update } from "firebase/database";

import { db } from "../firebase/firebaseConfig";

// User CRUD in Realtime Database
export const userService = {
  async createUser(userData) {
    await set(ref(db, `users/${userData.uid}`), userData);
    return userData;
  },

  async getUserById(uid) {
    const snapshot = await get(ref(db, `users/${uid}`));
    return snapshot.exists() ? snapshot.val() : null;
  },

  async updateUser(uid, data) {
    await update(ref(db, `users/${uid}`), data);

    const snapshot = await get(ref(db, `users/${uid}`));
    return snapshot.exists() ? snapshot.val() : null;
  },

  async updateProfile(uid, profileData) {
    const filteredData = Object.fromEntries(
      Object.entries(profileData).filter(([_, value]) => value !== undefined),
    );

    return userService.updateUser(uid, filteredData);
  },
};
