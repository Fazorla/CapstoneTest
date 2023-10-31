"use client";
import LocationCard from "@/components/LocationCard";
import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import Searchbar from "@/components/Searchbar";

const page = () => {
  const [expand, setExpand] = useState(false);
  return (
    <>
      <div className="justify-center items-center flex flex-col">
        <LocationCard></LocationCard>
        <LocationCard></LocationCard>
        <LocationCard></LocationCard>
        <LocationCard></LocationCard>
        <LocationCard></LocationCard>
        <motion.div
          transition={{ layout: { duration: 0.8, type: "spring" } }}
          layout
          onClick={() => setExpand(!expand)}
          className="bg-blue-300 p-4 my-4 mx-6 shadow-2xl text-center rounded-xl br-10 max-w-screen-sm"
        >
          <motion.h2 layout="position" className="text-center px-12">
            Custom Location...
          </motion.h2>
          {expand && (
            <motion.div className="">
              <p className="p-4">
                None of the above take your fancy? Add a custom location using
                the search bar and add it to your plan!
              </p>
              <Searchbar />
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default page;
