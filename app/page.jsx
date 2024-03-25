"use client";
import React from "react";
import { UserAuth } from "./Context/AuthContext";
import CitySearchBar from "@/components/CitySearchbar";

const Home = () => {
  const { user } = UserAuth();

  {
    if (user !== null && user !== undefined) {
      console.log(user.uid);
    }
  }
  return (
    <>
      {/* wow */}
      <div className="h-[calc(100vh-130px)] overflow-auto flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-700 ">DayOut to</h1>
        </div>
        <CitySearchBar />
      </div>
    </>
  );
};

export default Home;
