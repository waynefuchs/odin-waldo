// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhVGPR-b47c4vlH_1e_zrBZ9LX2qE8ho4",
  authDomain: "odin-waldo-7bb50.firebaseapp.com",
  projectId: "odin-waldo-7bb50",
  storageBucket: "odin-waldo-7bb50.appspot.com",
  messagingSenderId: "83212828147",
  appId: "1:83212828147:web:bb5a7c11cea8d483a5a686",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
