"use client";
import React from "react";
import Link from 'next/link';
import { UserAuth } from "../Context/AuthContext";
import { UserVisitsDB } from "app/firebase.js";
import { query, getDocs, collection, where } from "firebase/firestore";


const page = ({ searchParams }) => {
  let PoiList = [];
  const { user } = UserAuth();
  let city = "";

  Object.entries(searchParams).forEach(([key, value]) => {
    if (key === 'plan') {
      PoiList.push(...value.split(","));
    } else if (key === 'city') {
      city = value;
    }
  });

  const isLoggedIn = user && user.uid !== null && user.uid !== undefined;

  async function checkIfUserVisited(uid, locationName) {
    try {
      const querySnapshot = await getDocs(query(UserVisitsDB, where('UID', '==', uid), where('location', '==', locationName)));

  
      // If there are any documents that match the query, it means the visit exists
      return !querySnapshot.empty;
    } catch (error) {
      console.error('Error checking visit existence:', error);
      return false; // Handle the error according to your needs
    }
  }
  

  const handleButtonClick = async () => {

    try {
      const exists = await checkIfUserVisited(user.uid, city);
      
      if (exists) {
        console.log('User visited the specified location');
      } else {
        console.log('User did not visit the specified location');
      }
    } catch (error) {
      console.error('Error:', error);
      console.log('Error checking visit existence');
    }
  };
  
  return (
    <>
    <p>{city}, {user.uid}</p>
      <div className="flex flex-col align-center items-center">
        {PoiList.map((item, index) => (
          <div key={index}className="inline-flex items-center">
            <p className="text-xl">{item}</p>
            <label
              className="relative flex items-center p-3 rounded-full cursor-pointer"
              htmlFor="customStyle"
            >
              <input
                type="checkbox"
                className="before:content[''] peer relative h-8 w-8 cursor-pointer appearance-none rounded-full border border-gray-900/20 bg-gray-900/10 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:scale-105 hover:before:opacity-0"
                id="customStyle"
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
        )}
        <div>
      <button onClick={handleButtonClick}>Check Visit</button>
    
    </div>
      </div>
    </>
  );
};

export default page;
