"use client";
import React from "react";
import { Cities } from "../firebase";
import { getDocs } from "firebase/firestore";

async function page() {
  let POI = [];
  await getDocs(Cities).then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      POI.push({ ...doc.data(), id: doc.id });
    });
  });

  return (
    <>
      <div>
        {POI.map((item) => (
          <h1>City: {item.City}</h1>
        ))}
      </div>
    </>
  );
}

export default page;
