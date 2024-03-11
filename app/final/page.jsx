"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { UserAuth } from "../Context/AuthContext";
import { UserVisitsDB } from "@/app/firebase.js";
import { UserMedalsDB } from "@/app/firebase.js";
import {
  query,
  getDocs,
  where,
  doc,
  addDoc,
  updateDoc,
  increment,
  getDoc,
} from "firebase/firestore";

const page = ({ searchParams }) => {
  const [city, setCity] = useState(null);
  const [pois, setPois] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    if (searchParams.city) {
      setCity(searchParams.city);
    }
    if (searchParams.plan) {
      const pois = searchParams.plan.split(",").map((poi) => {
        const [id, name] = poi.split("///");
        return { id, name };
      });
      setPois(pois);
    }
  }, [searchParams]);

  const isLoggedIn = user && user.uid !== null && user.uid !== undefined;

  async function checkIfUserVisited(uid, locationName) {
    try {
      const querySnapshot = await getDocs(
        query(
          UserVisitsDB,
          where("UID", "==", uid),
          where("Location", "==", locationName)
        )
      );

      // If there are any documents that match the query, it means the visit exists
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error checking visit existence:", error);
      return false; // Handle the error according to your needs
    }
  }

  async function addUserVisit(uid, locationName) {
    try {
      // Check if the user has already visited the location
      const exists = await checkIfUserVisited(uid, locationName);

      if (!exists) {
        // If the user hasn't visited, add a new document to the UserVisitsDB collection
        const newVisitRef = await addDoc(UserVisitsDB, {
          Location: locationName,
          UID: uid,
          TimesVisited: 1,
        });

        console.log("New visit added with ID: ", newVisitRef.id);

        // Check if this is the user's first visit to this location
        if (newVisitRef.id) {
          // If it's the first visit, add a new document to the UserMedalsDB collection
          const newMedalRef = await addDoc(UserMedalsDB, {
            MedalType: "bronzeMedal",
            UID: uid,
            Location: locationName,
          });

          console.log("New medal added with ID: ", newMedalRef.id);
        } else {
          console.log("User already visited the specified location");
        }
      }
    } catch (error) {
      console.error("Error adding user visit:", error);
      // Handle the error according to your needs
    }
  }

  async function updateUserVisit(uid, locationName) {
    try {
      // Check if the user has visited the location
      const exists = await checkIfUserVisited(uid, locationName);

      if (exists) {
        // If the user has visited, find the document ID dynamically
        const querySnapshot = await getDocs(
          query(
            UserVisitsDB,
            where("UID", "==", uid),
            where("Location", "==", locationName)
          )
        );

        if (!querySnapshot.empty) {
          // Get the first matching document
          const userVisitDoc = querySnapshot.docs[0];

          // Update the TimesVisited field by incrementing it
          const userVisitRef = doc(UserVisitsDB, userVisitDoc.id);
          await updateDoc(userVisitRef, {
            TimesVisited: increment(1),
          });

          console.log("Visit count updated successfully");

          // Fetch the updated document data
          const updatedUserVisitDoc = await getDoc(userVisitRef);

          // Check if the user has visited twice to upgrade the medal type
          if (updatedUserVisitDoc.data().TimesVisited === 2) {
            const newMedalRef = await addDoc(UserMedalsDB, {
              MedalType: "silverMedal",
              UID: uid,
              Location: locationName,
            });

            console.log("New silver medal added with ID: ", newMedalRef.id);
          } else if (updatedUserVisitDoc.data().TimesVisited === 3) {
            const newMedalRef = await addDoc(UserMedalsDB, {
              MedalType: "goldMedal",
              UID: uid,
              Location: locationName,
            });

            console.log("New gold medal added with ID: ", newMedalRef.id);
          }
        } else {
          console.log("User has not visited the specified location");
        }
      } else {
        console.log("User has not visited the specified location");
      }
    } catch (error) {
      console.error("Error updating user visit:", error);
      // Handle the error according to your needs
    }
  }

  const handleButtonClick = async () => {
    try {
      const exists = await checkIfUserVisited(user.uid, city);

      if (exists) {
        // If the user has visited, update the visit count
        await updateUserVisit(user.uid, city);
      } else {
        // If the user hasn't visited, add a new visit
        await addUserVisit(user.uid, city);
      }
    } catch (error) {
      console.error("Error:", error);
      console.log("Error checking/updating visit");
    }
  };

  const openMaps = (placeId) => {
    const googleMapsUrl = `https://www.google.com/maps/place/?q=place_id:${placeId}`;
    window.open(googleMapsUrl, "_blank");
  };

  console.log(pois);
  return (
    <div className="flex flex-col  w-screen h-screen">
      <div className="flex flex-col justify-center items-center bg-slate-500 w-96 h-96">
        {pois.map((item, index) => (
          <div key={index} className="inline-flex items-center">
            <p className="text-xl">{item.name}</p>
            <label
              className="relative flex items-center p-3 rounded-full cursor-pointer"
              htmlFor={`customStyle-${index}`}
            >
              <input
                type="checkbox"
                id={`customStyle-${index}`}
                className="before:content[''] peer relative h-8 w-8 cursor-pointer appearance-none rounded-full border border-gray-900/20 bg-gray-900/10 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:scale-105 hover:before:opacity-0"
              />
              <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
            <button
              className="ml-2 bg-gray-200 hover:bg-gray-300 p-2 rounded-md"
              onClick={() => openMaps(item.id)}
            >
              Map
            </button>
          </div>
        ))}

        {isLoggedIn ? (
          <Link href={`/profiles/${user.uid}`}>
            <button className="inline-flex items-center m-4 bg-green-500 text-white rounded-md px-7 py-2 text-lg font-medium focus:outline-none focus:shadow-outline hover:bg-green-600">
              END DAY
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
        ) : (
          <Link href="/">
            <button
              onClick={handleButtonClick}
              className="inline-flex items-center m-4 bg-green-500 text-white rounded-md px-7 py-2 text-lg font-medium focus:outline-none focus:shadow-outline hover:bg-green-600"
            >
              END DAY
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
        )}
      </div>
    </div>
  );
};

export default page;
