"use client";
import React from "react";
import { UserAuth } from "./Context/AuthContext";
import SearchBar from "@/components/Searchbar";

const Home = () => {
  const { user } = UserAuth();
  return (
    <>
      <div className="h-[calc(100vh-96px)] flex flex-col items-center justify-center">
        <div className="px-20 text-center">
          <h1 className="text-4xl font-bold text-gray-700 ">DayOut to</h1>
        </div>
        <SearchBar />
      </div>
    </>
  );
};

export default Home;
