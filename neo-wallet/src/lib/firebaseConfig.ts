
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAM_q0NYduClRJiWcTQCsqKbmHgfCuzkbs",
  authDomain: "neo-wallet-8be73.firebaseapp.com",
  projectId: "neo-wallet-8be73",
  storageBucket: "neo-wallet-8be73.firebasestorage.app",
  messagingSenderId: "549254710386",
  appId: "1:549254710386:web:caceecb4c3c48f5a516eeb",
  measurementId: "G-QRZ34MPCQL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);