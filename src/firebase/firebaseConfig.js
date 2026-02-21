import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = JSON.parse(process.env.EXPO_PUBLIC_FIREBASE_CONFIG);

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);