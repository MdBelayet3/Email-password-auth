// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_P-L7fFm6BI0YL5v9tsdKOCyJ-d8qtV8",
  authDomain: "email-password-auth-7db77.firebaseapp.com",
  projectId: "email-password-auth-7db77",
  storageBucket: "email-password-auth-7db77.firebasestorage.app",
  messagingSenderId: "173563795541",
  appId: "1:173563795541:web:03e71a83b6d0ab106f1cdc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
