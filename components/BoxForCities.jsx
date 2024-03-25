import React, { useState } from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";

const BoxForCities = ({ userLocations, setUserLocations }) => {
  const [minimized, setMinimized] = useState(true); // Start minimized

  const toggleMinimize = () => {
    setMinimized(!minimized);
  };

  const handleRemoveLocation = (indexToRemove) => {
    setUserLocations((prevUserLocations) =>
      prevUserLocations.filter((location, index) => index !== indexToRemove)
    );
  };

  return (
    <div
      className={`absolute top-0 left-0 z-10 w-auto m-4 p-4 bg-white rounded-lg shadow-lg opacity-100 border-single border-2 border-black ${
        minimized ? "h-16" : "h-auto"
      }`}
    >
      <div className="flex items-center justify-between text-black">
        <div className="flex items-center mr-6 mb-6">
          <img
            src="/planner.svg"
            alt="planner Toggle"
            className="w-8 h-8 mr-2"
          />
          <h2 className="text-2xl font-bold">Your Plan</h2>
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
      {!minimized && (
        <div>
          <ul>
            {userLocations.map((location, index) => (
              <li key={index} className="flex items-center justify-between">
                <img
                  src="/locationPin.svg"
                  alt="Google Map"
                  className="min-w-8 min-h-8 max-w-8 max-h-8"
                />
                <p className="text-xl text-black p-4">{location.name}</p>
                <label
                  className="relative flex items-center p-3 rounded-full cursor-pointer ml-auto"
                  htmlFor={`customStyle-${index}`}
                ></label>
                <button
                  onClick={() => handleRemoveLocation(index)}
                  className="focus:outline-none ml-2 text-red-600"
                >
                  <img
                    src="/remove.svg"
                    alt="Google Map"
                    className="min-w-8 min-h-8 max-w-8 max-h-8"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BoxForCities;
