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
        featureType: "administrative",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#444444",
          },
        ],
      },
      {
        featureType: "landscape",
        elementType: "all",
        stylers: [
          {
            color: "#f2f2f2",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "all",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "poi.attraction",
        elementType: "all",
        stylers: [
          {
            visibility: "on",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "all",
        stylers: [
          {
            saturation: 1,
          },
          {
            lightness: 1,
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "all",
        stylers: [
          {
            visibility: "on",
          },
        ],
      },
      {
        featureType: "road.arterial",
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "on",
          },
        ],
      },
      {
        featureType: "transit",
        elementType: "all",
        stylers: [
          {
            visibility: "on",
          },
        ],
      },
      {
        featureType: "transit.station",
        elementType: "geometry",
        stylers: [
          {
            visibility: "on",
          },
        ],
      },
      {
        featureType: "transit.station",
        elementType: "labels",
        stylers: [
          {
            visibility: "on",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "all",
        stylers: [
          {
            color: "#00b5ff",
          },
          {
            visibility: "on",
          },
        ],
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
