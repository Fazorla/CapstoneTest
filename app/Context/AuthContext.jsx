//Needed due to useState etc..
"use client";

//imports
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";

//Creates a context object to allow for sharing data(state) between components
const UserContext = createContext();

//Function that provides the values to any component that consumes it
export const AuthContextProvider = ({ children }) => {
  //Stores and allows for changing of the current user
  const [user, setUser] = useState({});

  //A function that creates a new user account
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //A function that signs in a user with their email and password
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //A function that signs out the current user
  const logout = () => {
    return signOut(auth);
  };

  // Listen for changes to the user authentication state
  useEffect(() => {
    // Store the unsubscribe function so that we can call it later to unsubscribe
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Log the current user
      console.log(currentUser);

      // Update the user state
      setUser(currentUser);
    });

    // Return a function that unsubscribes from the authentication state changes
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    // Provider component
    <UserContext.Provider value={{ createUser, user, logout, signIn }}>
      {children}
    </UserContext.Provider>
  );
};
// Hook
export const UserAuth = () => {
  return useContext(UserContext);
};
