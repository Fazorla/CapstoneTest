"use client";
import { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const libraries = ["places"]; // Add the Places library for geocoding

const mapContainerStyle = {
  width: "100vw", // Adjust width and height as needed
  height: "95vh",
};

async function fetchCityCoordinates(cityName) {
  const response = await fetch(`/api/CityGeoLocation?cityName=${cityName}`);
  const data = await response.json();
  return data;
}

async function fetchPlaceCoordinates(placeId) {
  const response = await fetch(`/api/PlaceGeoLocation?placeId=${placeId}`);
  const data = await response.json();
  return data;
}

export default function MapComponent({ cityName, placeIds }) {
  const [cityCoordinates, setCityCoordinates] = useState(null);
  const [placeCoordinates, setPlaceCoordinates] = useState([]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAv9kGCUED097qnEx27Q0n7NyOAuKlmY5A", // Replace with your Google Maps API key
    libraries,
  });

  useEffect(() => {
    async function fetchData() {
      const cityCoords = await fetchCityCoordinates(cityName);
      setCityCoordinates(cityCoords);

      const placeCoordsPromises = placeIds.map(fetchPlaceCoordinates);
      const placesCoords = await Promise.all(placeCoordsPromises);
      setPlaceCoordinates(placesCoords);
    }

    if (isLoaded) {
      fetchData();
    }
  }, [cityName, placeIds, isLoaded]); // Add mapOptions as a dependency

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  const mapOptions = {
    disableDefaultUI: true,
    styles: [
      {
        featureType: "poi", // Points of Interest
        elementType: "label",
        stylers: [{ visibility: "off" }], // Hide POI labels
      },
      {
        featureType: "transit", // Travel labels (e.g., bus routes, train lines)
        elementType: "label",
        stylers: [{ visibility: "off" }], // Hide travel labels
      },
    ],
  };

  return (
    <div style={mapContainerStyle}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={cityCoordinates}
        options={mapOptions} // Pass mapOptions here
      >
        {placeCoordinates.map((placeCoord, index) => (
          <Marker key={index} position={placeCoord} />
        ))}
      </GoogleMap>
    </div>
  );
}
