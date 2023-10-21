"use client";
import React from "react";
import { UserAuth } from "./Context/AuthContext";
const Home = () => {
  const { user } = UserAuth();
  const whowho = () => {
    user ? console.log(user.uid) : console.log("No one ere");
  };

  return (
    <>
      <h1>HOME</h1>
      {user ? <p>{user.email}</p> : <p>no</p>}
      <button onClick={whowho}>Who?</button>
    </>
  );
};

export default Home;
