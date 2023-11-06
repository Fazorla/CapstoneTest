// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAv9kGCUED097qnEx27Q0n7NyOAuKlmY5A",
  authDomain: "capstone-e083f.firebaseapp.com",
  projectId: "capstone-e083f",
  storageBucket: "capstone-e083f.appspot.com",
  messagingSenderId: "964380433806",
  appId: "1:964380433806:web:ee3fed2bc5fb3595e298df",
  measurementId: "G-ZS8QJTR466",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore();
// const POIs = collection(database, "POIs");
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const POIs = collection(database, "POIs");
export const Cities = collection(database, "Cities");
