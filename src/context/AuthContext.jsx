import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth } from "../firebase/firebaseConfig";
import { userService } from "../services/userService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const dbUser = await userService.getUserById(firebaseUser.uid);
        setUser(dbUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = async ({ email, password, username }) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const firebaseUser = userCredential.user;

    await updateProfile(firebaseUser, { displayName: username });

    const newUser = {
      uid: firebaseUser.uid,
      email,
      username,
      phone: "",
      avatar: "",
      address: { street: "", city: "", country: "" },
      createdAt: Date.now(),
    };

    await userService.createUser(newUser);
    setUser(newUser);

    return newUser;
  };

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const firebaseUser = userCredential.user;
    const dbUser = await userService.getUserById(firebaseUser.uid);

    setUser(dbUser);
    return dbUser;
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const updateUser = async (data) => {
    if (!user) throw new Error("No logged in user");

    const updatedUser = await userService.updateUser(user.uid, data);
    setUser(updatedUser);

    return updatedUser;
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, register, login, logout, updateUser }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}
