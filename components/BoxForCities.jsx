"use client";
import React, { useState } from "react";

import { FaMinus, FaPlus } from "react-icons/fa";

const BoxForCities = ({ city, attractions }) => {
  const [minimized, setMinimized] = useState(false);

  const toggleMinimize = () => {
    setMinimized(!minimized);
  };

  return (
    <div
      className={`absolute top-0 left-0 w-auto m-4 p-4 bg-white rounded-lg shadow-lg opacity-100 border-single border-2 border-black ${
        minimized ? "h-16" : "h-auto"
      }`}
    >
      <div className="flex items-center justify-between text-black">
        <div className="flex items-center mr-6 mb-6">
          <h2 className="text-2xl font-bold">Your Plan for {city}</h2>
        </div>
        <button
          onClick={toggleMinimize}
          className="focus:outline-none mr-3 mb-6"
        >
          {minimized ? (
            <FaPlus className="w-6 h-6 text-black" />
          ) : (
            <FaMinus className="w-6 h-6 text-black" />
          )}
        </button>
      </div>
      {!minimized && <div>Hello</div>}
    </div>
  );
};

export default BoxForCities;
