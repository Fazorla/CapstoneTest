"use client";
import { motion } from "framer-motion";
import { useState } from "react";

function LocationCard(props) {
  const [expand, setExpand] = useState(false);

  return (
    <motion.div
      transition={{ layout: { duration: 0.8, type: "spring" } }}
      layout
      onClick={() => setExpand(!expand)}
      className="bg-orange-300 p-4 my-4 mx-6 shadow-2xl text-center rounded-xl br-10 max-w-screen-sm"
    >
      <motion.h2 layout="position" className="text-center px-12">
        {props.POI}
      </motion.h2>
      {expand && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <p className="p-4">{props.Desc}</p>
        </motion.div>
      )}
    </motion.div>
  );
}

export default LocationCard;
