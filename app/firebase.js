// Imports
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
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

// Export Firebase authentication instance
export const auth = getAuth(app);

// Export collections
export const UserVisitsDB = collection(database, "UserVisits");
export const UserMedalsDB = collection(database, "UserMedals");

// Old export when experimenting with hardcoded locations
export const POIs = collection(database, "POIs");
