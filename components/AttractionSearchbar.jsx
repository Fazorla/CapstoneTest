import React, { useState, useEffect } from "react";

const AttractionSearchbar = ({ city, addToDataArray }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const minInputLength = 3;

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
    // Clear the search term
    setSearchTerm("");

    setSuggestions([]);
    setShowSuggestions(false);

    // Splitting the suggestion.description to get the name and id
    const [placeNameSplit] = suggestion.description.split(",");

    // Pass the selected place ID to the parent component
    addToDataArray({ id: suggestion.place_id, name: placeNameSplit.trim() });
  };

  return (
    <div className="relative mb-6">
      <form className="w-auto">
        <input
          placeholder="e.g. Museum, Bar"
          className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          value={searchTerm}
          onChange={handleChange}
        />

        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute bg-white border border-gray-300 rounded max-h-48 overflow-y-auto left-0">
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
