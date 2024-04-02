import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/navigation";

const Searchbar = () => {
  // State variables for the search term, suggestions, and whether to show suggestions
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true); // New state
  const minInputLength = 2; // Minimum length of input before triggering search
  const router = useRouter(); // Hook to access Next.js router

  // Function to handle the search action
  const handleSearch = async () => {
    try {
      if (searchTerm.length < minInputLength) {
        // Check if input length is too short
        console.log(
          "Input length is too short. Minimum length:",
          minInputLength
        );
        setSuggestions([]); // Clear suggestions
        return false;
      }

      const response = await fetch(
        // Fetch autocomplete suggestions from the server
        `/api/places/autocomplete?input=${searchTerm}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        // Check if response is not okay
        throw new Error("Failed to fetch places.");
      }

      const data = await response.json(); // Parse response JSON

      if (data.status === "OK" && data.predictions.length > 0) {
        setSuggestions(data.predictions); // Set suggestions based on response data
        return true;
      } else {
        setSuggestions([]); // Clear suggestions if no valid predictions
        return false;
      }
    } catch (error) {
      console.error("Error searching for places:", error.message); // Log error if any
      return false;
    }
  };

  // Function to handle input change
  const handleChange = (e) => {
    const value = e.target.value; // Get input value
    setSearchTerm(value); // Update search term state

    if (value.length >= minInputLength) {
      handleSearch(); // Trigger search when input length meets minimum requirement
      setShowSuggestions(true); // Show suggestions when input changes
    } else {
      setSuggestions([]); // Clear suggestions if input length is less than minimum
      setShowSuggestions(true); // Show suggestions when input changes
    }
  };

  // Function to handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.description); // Update search term with clicked suggestion
    setSuggestions([]); // Clear suggestions
    setShowSuggestions(false); // Hide suggestions after a suggestion is clicked
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (
      suggestions.length > 0 &&
      suggestions.some(
        (s) => s.description.toLowerCase() === searchTerm.toLowerCase()
      )
    ) {
      router.push(`/cities/${encodeURIComponent(searchTerm)}`); // Navigate to city page if suggestion matches search term
    } else {
      const isValidCity = await handleSearch(); // Check if entered city is valid
      if (isValidCity) {
        router.push(`/cities/${encodeURIComponent(searchTerm)}`); // Navigate to city page if valid city
      }
    }
  };

  return (
    <div className="relative pt-5">
      <form className="w-auto relative" onSubmit={handleSubmit}>
        {/* Input field for search term */}
        <input
          type="text"
          placeholder="e.g. London, Paris"
          className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          value={searchTerm}
          onChange={handleChange}
        />
        {/* Button for submitting search */}
        <button
          type="submit"
          className="absolute right-1 top-5 -translate-y-1/2 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        >
          <AiOutlineSearch /> {/* Search icon */}
        </button>

        {/* Display suggestions if there are any */}
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute z-10 bg-white border border-gray-300 rounded mt-2 w-full max-h-48 overflow-y-auto left-0">
            {/* Map through suggestions and render them as list items */}
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.place_id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)} // Handle click on suggestion
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
