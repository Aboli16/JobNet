// Import the functions you need from the SDKs you need
import app from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBhvawnA901XsD7QveI_OoNTzVYJHkctD0",
  authDomain: "placemates-adf7b.firebaseapp.com",
  projectId: "placemates-adf7b",
  storageBucket: "placemates-adf7b.appspot.com",
  messagingSenderId: "446865304937",
  appId: "1:446865304937:web:893bf274273a11b16f61f8",
  measurementId: "G-CPMFWEHG7X"
};

// Initialize Firebase
const firebase = app.initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const firestore = firebase.firestore();

export {firebase, firestore, app};