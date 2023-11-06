import LocationCard from "@/components/LocationCard";
import React from "react";
import { POIs } from "../firebase";
import { getDocs } from "firebase/firestore";

async function page(props) {
  let POIis = [];
  await getDocs(POIs).then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      POIis.push({ ...doc.data(), id: doc.id });
    });
  });
  const BerlinPOIs = POIis.filter((item) => item.City === "Berlin");
  return (
    <>
      <div className="justify-center items-center flex flex-col">
        {BerlinPOIs.map((item) => (
          <LocationCard Desc={item.Desc} POI={item.POI} />
        ))}
      </div>
    </>
  );
}

export default page;
