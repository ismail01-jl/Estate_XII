// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-estate-e1015.firebaseapp.com",
    projectId: "mern-estate-e1015",
    storageBucket: "mern-estate-e1015.appspot.com",
    messagingSenderId: "932862052654",
    appId: "1:932862052654:web:61a5b1ecc02f3f210312bf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);