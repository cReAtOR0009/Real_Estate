// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"; // Corrected import syntax

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9zOl89paLUOem551r1wqXxaBS2G5zGDw",
  authDomain: "realestate-90a50.firebaseapp.com",
  projectId: "realestate-90a50",
  storageBucket: "realestate-90a50.appspot.com",
  messagingSenderId: "345813751116",
  appId: "1:345813751116:web:2f53a0ef00a2b9b3b32be9",
  measurementId: "G-8Z0V9SRQ7G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { getStorage, ref, getDownloadURL, uploadBytesResumable, app } // Export Storage functions
// module.exports.app = app; // Export Firebase app object
