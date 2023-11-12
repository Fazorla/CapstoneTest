"use client";

import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Cities } from "../app/firebase";
import { getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const cityArray = [];
      const querySnapshot = await getDocs(Cities);

      querySnapshot.forEach((doc) => {
        cityArray.push({ ...doc.data(), id: doc.id });
      });

      setCities(cityArray);
    };

    fetchData();
  }, []); // The empty dependency array ensures that the effect runs once when the component mounts

  const handleSearch = () => {
    const cityExists = cities.some((city) => city.City === searchTerm);
    if (cityExists) {
      router.push(`/cities/${encodeURIComponent(searchTerm)}`);
    } else {
      // Handle case when the city is not in the array
      console.log("City not found");
    }
  };

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
          placeholder="e.g. London, Paris"
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
