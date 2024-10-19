// app/firebaseConfig.ts

import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your Firebase configuration from the Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBKhIVHSNOhWK72VD2iznvOlqYIXgqXFeM",
  authDomain: "criticallink-dea3e.firebaseapp.com",
  projectId: "criticallink-dea3e",
  storageBucket: "criticallink-dea3e.appspot.com",
  messagingSenderId: "213994691593",
  appId: "1:213994691593:web:e2abe10e29380215816cd8",
  measurementId: "G-B612KSQDF7"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
