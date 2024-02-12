// pages/AttractionsPage.js
"use client";
import { useEffect, useState } from "react";

const MINIMUM_RATING = 2.0; // Set your desired minimum rating

const AttractionsPage = () => {
  const [attractions, setAttractions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRandomAttractions = async () => {
      try {
        const response = await fetch(
          "/api/places/textsearch?query=new+york+city+point+of+interest"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch random attractions");
        }

        const data = await response.json();

        if (data && data.attractions && Array.isArray(data.attractions)) {
          // Filter attractions based on your criteria (e.g., minimum rating)
          const filteredAttractions = data.attractions.filter(
            (attraction) => attraction.rating >= MINIMUM_RATING
          );

          setAttractions(filteredAttractions);
        } else {
          console.error("Invalid data structure:", data);
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching random attractions:", error);
      }
    };

    fetchRandomAttractions();
  }, []);

  return (
    <div>
      <h1>Random Attractions</h1>
      {error ? (
        <p>Error: {error.message}</p>
      ) : (
        <ul>
          {attractions.map((place, index) => (
            <li key={`${place.id}-${index}`}>
              <h3>{`Name: ${place.name}`}</h3>
              <p>{`Rating: ${place.rating}`}</p>
              <p>{`Address: ${place.address}`}</p>
              {place.photoUrl && (
                <img src={place.photoUrl} alt={`${place.name} Photo`} />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AttractionsPage;
