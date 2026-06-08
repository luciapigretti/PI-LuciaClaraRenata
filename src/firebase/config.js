
import app from "firebase/app"
import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCk_ecpwAH06fZFuA4Yjn0OXZqM8nY2yrM",
  authDomain: "proyectointegrador-bd6e2.firebaseapp.com",
  projectId: "proyectointegrador-bd6e2",
  storageBucket: "proyectointegrador-bd6e2.firebasestorage.app",
  messagingSenderId: "159457560789",
  appId: "1:159457560789:web:6ad4c8cbf86a736fccfa5c"
};

// Initialize Firebase
 app.initializeApp(firebaseConfig);
export const auth = firebase.auth()
export const db = app.firestore()