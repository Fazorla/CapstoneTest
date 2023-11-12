"use client";
// Import necessary modules
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { UserAuth } from "../Context/AuthContext";
import { useRouter } from "next/navigation";
// Define the SigningPage component
function SigningPage() {
  // Declare state variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { createUser, signIn } = UserAuth();
  const { push } = useRouter();
  // Declare a state variable to track the current title of the page
  const [title, setTitle] = useState("Sign In");
  // Define a function to handle the form submission
  const onSubmitDecider = async (e) => {
    if (title === "Sign In") {
      e.preventDefault();
      setError("");
      try {
        await signIn(email, password);
        push("../");
      } catch {
        setError(e.message);
        console.log(e.message);
      }
    } else {
      // If the title is "Create Account", create a new user with their email and password
      e.preventDefault();
      setError("");
      try {
        await createUser(email, password);
        push("../");
      } catch {
        setError(e.message);
        console.log(e.message);
      }
    }
  };

  // Return the JSX for the SigningPage component
  return (
    <div className="flex w-screen content-center justify-center h-screen p-10">
      <form
        onSubmit={onSubmitDecider}
        name="myForm"
        id="authForm"
        className=" shadow-2xl p-10 h-fit w-full  lg:w-3/4 xl:w-2/4 2xl:w-3/6 flex-col content-center justify-center "
      >
        <div className="flex-col justify-center items-center mb-6">
          <div>
            <h2 className="w-auto text-center	text-3xl font-bold text-gray-700">
              {title}
            </h2>
          </div>
          <hr className="w-1/2 h-1 mx-auto border-0 rounded mt-4 mb-14 dark:bg-gray-600" />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {title === "Create Account" ? (
          <div></div>
        ) : (
          <div className="m-auto">
            <a
              className="text-base font-bold text-sm text-blue-500 hover:text-blue-600 font"
              href="#"
            >
              Forgot Password
            </a>
          </div>
        )}
        <div className="flex items-center justify-between pt-12">
          <button
            id="CreateAccount"
            type="button"
            onClick={() => {
              setTitle("Create Account");
              const button = document.getElementById("CreateAccount");
              title === "Create Account"
                ? (button.type = "submit")
                : (button.type = "button");
            }}
            className={
              title === "Create Account"
                ? "text-base bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                : "py-2 text-base bg-transparent text-blue-500 hover:text-blue-600 font-bold rounded-md focus:outline-none focus:shadow-outline"
            }
          >
            Create Account
          </button>
          <button
            id="SignIn"
            type="submit"
            onClick={() => {
              setTitle("Sign In");
              const button = document.getElementById("SignIn");
              title === "Sign In"
                ? (button.type = "submit")
                : (button.type = "button");
              console.log(button.type);
            }}
            className={
              title === "Sign In"
                ? "text-base bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                : "py-2 px-4 text-base bg-transparent text-blue-500 hover:text-blue-600 font-bold rounded-md focus:outline-none focus:shadow-outline"
            }
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}

export default SigningPage;
