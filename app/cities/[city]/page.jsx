//CITIES PAGE
"use client";
import LocationCard from "@/components/LocationCard";
import AttractionSearchbar from "@/components/attractionSearchbar";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import useAttractions from "@/pages/api/attractionsAPI";
import { FaSyncAlt } from "react-icons/fa";

const CityPage = ({ params }) => {
  const decodedCity = decodeURIComponent(params.city);
  const [dataArray, setDataArray] = useState([]);
  const [hasFeaturedSights, setHasFeaturedSights] = useState(false);
  const { attractions, error, refetch } = useAttractions(decodedCity); // Include refetch function

  useEffect(() => {
    // Check if attractions are available and update hasFeaturedSights accordingly
    if (attractions && attractions.length > 0) {
      setHasFeaturedSights(true);
    }
  }, [attractions]); // Run this effect whenever attractions change

  const addToDataArray = (newItem) => {
    setDataArray((prevDataArray) => [...prevDataArray, newItem]);
  };

  const handleRefresh = () => {
    // Call the refetch function to reload attractions
    refetch();
  };

  return (
    <>
      <div>Put current plan in here</div>
      <div className="pt-20 flex flex-col justify-center items-center">
        <h1 className="text-center text-4xl font-bold text-gray-700 ">
          Where to in {decodedCity}?
        </h1>
        <AttractionSearchbar
          city={decodedCity}
          addToDataArray={addToDataArray}
        />
        <div className="flex items-center md:mt-[80px] sm:w-mt-[40px] lg:mt-[120px]">
          <h1 className="text-3xl font-bold text-gray-700 mr-3">
            Featured Attractions
          </h1>
          <button
            onClick={handleRefresh}
            className="bg-transparent border-none focus:outline-none"
          >
            <FaSyncAlt
              size={20}
              className="text-gray-500 hover:text-gray-700"
            />
          </button>
        </div>
        <div className="flex justify-center flex-row flex-wrap items-center">
          {attractions &&
            attractions.map((place, index) => (
              <LocationCard
                city={decodedCity}
                key={`${place.id}-${index}`}
                image={place.photoUrl}
                name={place.name}
                description={place.description}
                address={place.address}
                rating={place.rating}
                addToDataArray={addToDataArray}
                placeID={place.id}
              />
            ))}
        </div>

        <div className="flex justify-center flex-row flex-wrap items-center">
          <Link
            href={{
              pathname: "/final",
              query: {
                plan: dataArray
                  .map((item) => `${item.id}///${item.name}`)
                  .join(","),
                city: decodedCity,
              },
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
    </>
  );
};

export default CityPage;
