"use client";
import { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  MapControls,
} from "@vis.gl/react-google-maps";

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

  useEffect(() => {
    async function fetchData() {
      const cityCoords = await fetchCityCoordinates(cityName);
      setCityCoordinates(cityCoords);

      const placeCoordsPromises = placeIds.map(fetchPlaceCoordinates);
      const placesCoords = await Promise.all(placeCoordsPromises);
      setPlaceCoordinates(placesCoords);
    }
    fetchData();
  }, [cityName, placeIds]);

  return (
    <APIProvider apiKey="AIzaSyAv9kGCUED097qnEx27Q0n7NyOAuKlmY5A">
      <div className="h-screen w-screen">
        {cityCoordinates && (
          <Map
            defaultCenter={cityCoordinates}
            defaultZoom={12}
            mapId="9a7d0f88ac803935"
          >
            {placeCoordinates.map((placeCoord, index) => (
              <AdvancedMarker key={index} position={placeCoord}>
                <Pin />
              </AdvancedMarker>
            ))}
          </Map>
        )}
      </div>
    </APIProvider>
  );
}
