import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyAnTeHHyvt79AG9umJICpsjoNMuJv8OW4k",
    authDomain: "gestor-9afc1.firebaseapp.com",
    projectId: "gestor-9afc1",
    storageBucket: "gestor-9afc1.appspot.com",
    messagingSenderId: "616829308603",
    appId: "1:616829308603:web:21335092771bff92c7a39e",
    measurementId: "G-PG54DFR2ZL"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);