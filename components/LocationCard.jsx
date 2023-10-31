"use client";
import { motion } from "framer-motion";
import { useState } from "react";

function LocationCard() {
  const [expand, setExpand] = useState(false);

  return (
    <motion.div
      transition={{ layout: { duration: 0.8, type: "spring" } }}
      layout
      onClick={() => setExpand(!expand)}
      className="bg-orange-300 p-4 my-4 mx-6 shadow-2xl text-center rounded-xl br-10 max-w-screen-sm"
    >
      <motion.h2 layout="position" className="text-center px-12">
        London Destination
      </motion.h2>
      {expand && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <p className="p-4">
            London, city, capital of the United Kingdom. It is among the oldest
            of the world's great cities—its history spanning nearly two
            millennia—and one of the most cosmopolitan. By far Britain's largest
            metropolis, it is also the country's economic, transportation, and
            cultural centre.
          </p>
          <p className="p-4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio
            nam repellat dolore earum, fuga repellendus sint.
          </p>
          <motion.button onClick={console.log("He")}>Hello</motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}

export default LocationCard;
