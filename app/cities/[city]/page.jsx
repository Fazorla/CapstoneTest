"use client";

import LocationCard from "@/components/LocationCard";
import React, { useEffect, useState } from "react";
import { POIs } from "app/firebase.js";
import { getDocs } from "firebase/firestore";
import Link from "next/link";

const CityPage = ({ params }) => {
  const [destinations, setDestination] = useState([]);
  const [dataArray, setDataArray] = useState([]);

  const addToDataArray = (newItem) => {
    setDataArray((prevDataArray) => [...prevDataArray, newItem]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const destinationArray = [];
      const querySnapshot = await getDocs(POIs);
      querySnapshot.forEach((doc) => {
        destinationArray.push({ ...doc.data(), id: doc.id });
      });

      setDestination(destinationArray);
    };

    fetchData();
  }, []);
  return (
    <div className="flex flex-col">
      <div className="flex justify-center flex-row flex-wrap items-center">
        {destinations.map((item) => {
          if (item.City === params.city) {
            console.log(item.id);
            return (
              <LocationCard
                POI={item.POI}
                Desc={item.Desc}
                key={item.id}
                ID={item.id}
                image={item.imageURL}
                addToDataArray={addToDataArray}
              ></LocationCard>
            );
          }
          return null;
        })}
      </div>
      <div className="flex justify-center flex-row flex-wrap items-center">
        <Link
          href={{ pathname: "/final", query: { plan: dataArray.join(",") } }}
        >
          <button className="inline-flex items-center m-4 bg-green-500 text-white rounded-md px-7 py-2 text-lg font-medium focus:outline-none focus:shadow-outline hover:bg-green-600">
            Finish Plan
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
