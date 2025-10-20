// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyComg1aU3N6t-uA8gLyWq3gajv_G2JOgFs",
  authDomain: "rpg-game-4c678.firebaseapp.com",
  projectId: "rpg-game-4c678",
  storageBucket: "rpg-game-4c678.firebasestorage.app",
  messagingSenderId: "448727586441",
  appId: "1:448727586441:web:3bbdaae430ab1910c79858",
  measurementId: "G-PHWLHR7283"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app)

export { db, auth }