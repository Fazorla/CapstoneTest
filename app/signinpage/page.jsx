"use client";
import React, { useEffect, useState } from "react";

function SigningPage() {
  const [title, setTitle] = useState("Sign In");
  const [createButtonType, setCreateButtonType] = useState("button");
  const [signButtonType, setSignButtonType] = useState("submit");

  useEffect(() => {
    const signButton = document.getElementById("SignIn");
    const createButton = document.getElementById("CreateAccount");
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="flex w-screen content-center justify-center h-screen p-10">
      <form className=" shadow-2xl p-10 h-fit w-full  lg:w-3/4 xl:w-2/4 2xl:w-3/6 flex-col content-center justify-center ">
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
            Username
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {title === "Sign In" ? (
          <div></div>
        ) : (
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
        )}
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
