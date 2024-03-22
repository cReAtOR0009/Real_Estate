// Import the functions you need from the SDKs you needREACT
const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");
const  { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
module.exports.firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_APP_ID,
  measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID,
};

// module.exports.initializeApp = initializeApp
// module.exports.getAnalytics = getAnalytics

// Initialize Firebase
module.exports.firebaseApp = initializeApp(this.firebaseConfig);
module.exports = {getStorage, ref, getDownloadURL, uploadBytesResumable}
// module.exports.analytics = getAnalytics(this.app);
