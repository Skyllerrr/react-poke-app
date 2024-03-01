// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcTdt69PrwiFyqdNEK1X8zBjgRV2UJaAY",
  authDomain: "react-poke-app-73b95.firebaseapp.com",
  projectId: "react-poke-app-73b95",
  storageBucket: "react-poke-app-73b95.appspot.com",
  messagingSenderId: "365413323120",
  appId: "1:365413323120:web:85d74544eb7af2b0757fb5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app