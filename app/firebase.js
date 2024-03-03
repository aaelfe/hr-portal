// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-IxsFN19KJLewMJeP_gaPvnOqwkIqg6Y",
  authDomain: "ua-innovate-24.firebaseapp.com",
  projectId: "ua-innovate-24",
  storageBucket: "ua-innovate-24.appspot.com",
  messagingSenderId: "1035416464318",
  appId: "1:1035416464318:web:b9f396bc8c2e50cebaa7ef",
  measurementId: "G-K7Z5L1R8PS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const bucket = getStorage(app);