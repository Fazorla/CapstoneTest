"use client";
import React from "react";
import { UserAuth } from "../Context/AuthContext";
const page = ({ searchParams }) => {
  let seasonsList = [];
  const { user } = UserAuth();

  Object.values(searchParams).forEach((value) => {
    seasonsList.push(...value.split(","));
  });
  console.log(Object.values(seasonsList));
  {
    console.log(user.uid);
  }
  return (
    <>
      <div className="flex flex-col align-center items-center">
        {seasonsList.map((item) => (
          <div class="inline-flex items-center">
            <p className="text-xl">{item}</p>
            <label
              class="relative flex items-center p-3 rounded-full cursor-pointer"
              htmlFor="customStyle"
            >
              <input
                type="checkbox"
                class="before:content[''] peer relative h-8 w-8 cursor-pointer appearance-none rounded-full border border-gray-900/20 bg-gray-900/10 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:scale-105 hover:before:opacity-0"
                id="customStyle"
              />
              <span class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="1"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
          </div>
        ))}
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
      </div>
    </>
  );
};

export default page;