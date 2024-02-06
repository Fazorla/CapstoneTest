// components/AttractionSearchbar.jsx
import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/navigation";

const AttractionSearchbar = ({ city, onDataSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const minInputLength = 3;
  const router = useRouter();

  const handleSearch = async () => {
    try {
      if (searchTerm.length < minInputLength) {
        console.log(
          "Input length is too short. Minimum length:",
          minInputLength
        );
        setSuggestions([]);
        return;
      }

      // Fetch attractions using Google Places API with city
      const response = await fetch(
        `/api/places/attractions?input=${searchTerm}&city=${encodeURIComponent(
          city
        )}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch attractions.");
      }

      const data = await response.json();

      if (data.predictions && data.predictions.length > 0) {
        setSuggestions(data.predictions);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error searching for attractions:", error.message);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length >= minInputLength) {
      handleSearch();
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(true);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.description);
    setSuggestions([]);
    setShowSuggestions(false);

    // Pass the selected place ID to the parent component
    onDataSelect(suggestion.description);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/cities/${encodeURIComponent(city)}`);
  };

  return (
    <div className="relative">
      <form
        className="w-auto px-13 py-5 px-10 relative"
        onSubmit={handleSubmit}
      >
        <input
          placeholder="e.g. Museum, Bar"
          className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          value={searchTerm}
          onChange={handleChange}
        />

        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute z-10 bg-white border border-gray-300 rounded mt-2 w-full max-h-48 overflow-y-auto left-0">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.place_id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.description}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
};

export default AttractionSearchbar;
