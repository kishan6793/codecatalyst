import {initializeApp} from 'firebase/app'
import { GoogleGenerativeAI } from "@google/generative-ai";


const firebaseConfig = {
  apiKey: String(import.meta.env.VITE_FIREBASE_API_KEY),
  authDomain : String(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  projectId: String(import.meta.env.VITE_FIREBASE_PROJECT_ID),
  storageBucket: String(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: String(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
  appId: String(import.meta.env.VITE_FIREBASE_APP_ID),
};
  
export const app = initializeApp(firebaseConfig);

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_GEMINI_KEY);

export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });