import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = JSON.parse(process.env.EXPO_PUBLIC_FIREBASE_CONFIG);

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getDatabase(app);
export const storage = getStorage(app);