"use client";
import LocationCard from "@/components/LocationCard";
import AttractionSearchbar from "@/components/attractionSearchbar";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import useAttractions from "utils/attractionsAPI";

const CityPage = ({ params }) => {
  const decodedCity = decodeURIComponent(params.city);
  const [dataArray, setDataArray] = useState([]);
  const [hasFeaturedSights, setHasFeaturedSights] = useState(false);
  const { attractions, error } = useAttractions(decodedCity);

  const addToDataArray = (newItem) => {
    setDataArray((prevDataArray) => [...prevDataArray, newItem]);
  };

  const handlePlaceNameSelect = (placeName) => {
    const [placeNameSplit] = placeName.split(",");
    addToDataArray(placeNameSplit);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-gray-700 ">
        Where to in {decodedCity}?
      </h1>
      <AttractionSearchbar
        city={decodedCity}
        onDataSelect={handlePlaceNameSelect}
      />
      {hasFeaturedSights && (
        <h1 className="text-3xl font-bold text-gray-700 ">
          Featured Attractions
        </h1>
      )}
      <div className="flex justify-center flex-row flex-wrap items-center">
        {console.log(attractions)}
        {attractions.map((place, index) => {
          return (
            <LocationCard
              key={`${place.id}-${index}`}
              image={place.photoUrl}
              name={place.name}
              description={place.description}
              address={place.address}
              rating={place.rating}
              addToDataArray={addToDataArray}
            ></LocationCard>
          );
        })}
      </div>

      <div className="flex justify-center flex-row flex-wrap items-center">
        <Link
          href={{
            pathname: "/final",
            query: { plan: dataArray.join(","), city: decodedCity },
          }}
        >
          <button className="inline-flex items-center m-4 bg-green-500 text-white rounded-md px-7 py-2 text-lg font-medium focus:outline-none focus:shadow-outline hover:bg-green-600">
            Finish Planning
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CityPage;
