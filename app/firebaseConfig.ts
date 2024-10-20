import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKhIVHSNOhWK72VD2iznvOlqYIXgqXFeM",
  authDomain: "criticallink-dea3e.firebaseapp.com",
  projectId: "criticallink-dea3e",
  storageBucket: "criticallink-dea3e.appspot.com",
  messagingSenderId: "213994691593",
  appId: "1:213994691593:web:e2abe10e29380215816cd8",
  measurementId: "G-B612KSQDF7"
};

// Initialize Firebase only if there are no initialized apps
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]; // Use the already initialized app
}

// Firestore and Auth exports
export const db = getFirestore(app);
// export const auth = getAuth(app);
