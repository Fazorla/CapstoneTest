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
    <>
      <div className="flex w-max justify-center flex-row flex-nowrap items-center">
        {destinations.map((item) => {
          if (item.City === params.city) {
            console.log(item.id)
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
      <Link
        href={{ pathname: "/final", query: { plan: dataArray.join(",") } }}
      >
        LOL
      </Link>
    </>
  );
};

export default CityPage;
