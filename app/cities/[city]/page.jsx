"use client";

import LocationCard from "@/components/LocationCard";
import React, { useEffect, useState } from "react";
import { POIs } from "app/firebase.js";
import { getDocs } from "firebase/firestore";
import Link from "next/link";

const CityPage = ({ params }) => {
  const [destinations, setDestination] = useState([]);
  let Locationsx = [1, 2, 3, 4, 5];

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
      <div>
        {destinations.map((item) => {
          if (item.City === params.city) {
            return (
              <LocationCard
                POI={item.POI}
                Desc={item.Desc}
                key={item.id}
              ></LocationCard>
            );
          }
          return null;
        })}
      </div>
      <Link
        href={{ pathname: "/final", query: { plan: Locationsx.join(",") } }}
      >
        LOL
      </Link>
    </>
  );
};

export default CityPage;
