// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore } from "firebase/firestore"
import { getFunctions, httpsCallable } from "firebase/functions";
import { getAuth } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOXKqKE1I0jvGilePkPnU8fMdn7UyJiCA",
  authDomain: "cloud-funcs-91c03.firebaseapp.com",
  projectId: "cloud-funcs-91c03",
  storageBucket: "cloud-funcs-91c03.appspot.com",
  messagingSenderId: "601310969260",
  appId: "1:601310969260:web:396bf75b6e8bfd51340e09",
  measurementId: "G-KZMPE42W0G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

//Initialize Firestore
const db = getFirestore(app);

// Initialize Functions
const functions = getFunctions();
const addMessage = httpsCallable(functions, 'addMessage');
addMessage({ text: messageText })
  .then((result) => {
    // Read result of the Cloud Function.
    /** @type {any} */
    const data = result.data;
    const sanitizedMessage = data.text;
  })
  .catch((error) => {
    // Getting the Error details.
    const code = error.code;
    const message = error.message;
    const details = error.details;
    // ...
  });