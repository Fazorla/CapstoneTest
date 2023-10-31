"use client";

import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
// Remember to import words or whatever you're using to store all the words the user can search for

const Searchbar = () => {
  const [activeSearch, setActiveSearch] = useState([]);

  return (
    <form className="w-auto px-13 py-5 px-10">
      <div className="relative">
        <input
          placeholder="e.g. London, Paris"
          className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button className="absolute right-1 top-5 -translate-y-1/2 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline">
          <AiOutlineSearch />
        </button>
      </div>
    </form>
  );
};

export default Searchbar;
