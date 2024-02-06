// components/Searchbar.jsx
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/navigation";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true); // New state
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
        return false;
      }

      const response = await fetch(
        `/api/places/autocomplete?input=${searchTerm}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch places.");
      }

      const data = await response.json();

      if (data.status === "OK" && data.predictions.length > 0) {
        setSuggestions(data.predictions);
        return true;
      } else {
        setSuggestions([]);
        return false;
      }
    } catch (error) {
      console.error("Error searching for places:", error.message);
      return false;
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length >= minInputLength) {
      handleSearch();
      setShowSuggestions(true); // Show suggestions when input changes
    } else {
      setSuggestions([]);
      setShowSuggestions(true); // Show suggestions when input changes
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.description);
    setSuggestions([]);
    setShowSuggestions(false); // Hide suggestions after a suggestion is clicked
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      suggestions.length > 0 &&
      suggestions.some(
        (s) => s.description.toLowerCase() === searchTerm.toLowerCase()
      )
    ) {
      router.push(`/cities/${encodeURIComponent(searchTerm)}`);
    } else {
      const isValidCity = await handleSearch();
      if (isValidCity) {
        router.push(`/cities/${encodeURIComponent(searchTerm)}`);
      }
    }
  };

  return (
    <div className="relative">
      <form
        className="w-auto px-13 py-5 px-10 relative"
        onSubmit={handleSubmit}
      >
        <input
          placeholder="e.g. London, Paris"
          className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          value={searchTerm}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="absolute right-1 top-5 -translate-y-1/2 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        >
          <AiOutlineSearch />
        </button>

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

export default Searchbar;
