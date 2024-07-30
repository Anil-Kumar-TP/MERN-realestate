
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-a23fb.firebaseapp.com",
  projectId: "mern-estate-a23fb",
  storageBucket: "mern-estate-a23fb.appspot.com",
  messagingSenderId: "959764578389",
  appId: "1:959764578389:web:361b0b4696e2ece3ac94dc"
};


export const app = initializeApp(firebaseConfig);