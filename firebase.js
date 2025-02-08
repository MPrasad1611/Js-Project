// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5zczKp-eYIwveyX7eb8YnC28UYRn97Gw",
  authDomain: "js-project-f2438.firebaseapp.com",
  projectId: "js-project-f2438",
  storageBucket: "js-project-f2438.firebasestorage.app",
  messagingSenderId: "726104076537",
  appId: "1:726104076537:web:cc2f19f25d76f4fd0f3228",
  measurementId: "G-CJZQ2S0NK4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword};
