"use client";

import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/navigation";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  return (
    <form
      className="w-auto px-13 py-5 px-10"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <div className="relative">
        <input
          placeholder="e.g. Museum, Bar"
          className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-1 top-5 -translate-y-1/2 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        >
          <AiOutlineSearch />
        </button>
      </div>
    </form>
  );
};

export default Searchbar;
