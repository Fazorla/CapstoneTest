import React, { useState } from "react";

// Modal component
// Modal component
const Modal = ({ content, onClose }) => {
  return (
    <div className="z-40 fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75">
      <div className="rounded-lg m-2 bg-gray-800 p-4 relative lg:w-1/2 md:w-4/5 sm:w-4/5">
        <button
          className="absolute top-2 right-2 text-gray-200"
          onClick={onClose}
        >
          &times;
        </button>
        {content}
      </div>
    </div>
  );
};

// LocationCard component
function LocationCard(props) {
  const [showModal, setShowModal] = useState(false);

  const handleAddItem = () => {
    props.addToDataArray({ id: props.placeID, name: props.name });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <div className="flex flex-col w-[23rem] h-[28rem] rounded-lg m-2 bg-gray-800">
      <img
        className="w-full h-52 rounded-t-lg object-cover"
        src={props.image}
        alt=""
      />
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2">
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white truncate">
            {props.name}
          </h5>
        </div>

        <div className="mb-2">
          <div className="mb-2 flex items-center">
            <h5 className="text-s tracking-tight text-gray-900 dark:text-white mr-2">
              {props.rating}
            </h5>
            {[...Array(Math.min(Math.round(props.rating), 5))].map(
              (_, index) => (
                <span
                  key={index}
                  role="img"
                  aria-label="star"
                  className="text-yellow-500"
                >
                  &#x2B50;
                </span>
              )
            )}
            {[...Array(Math.max(5 - Math.round(props.rating), 0))].map(
              (_, index) => (
                <span
                  key="greyed-star"
                  role="img"
                  aria-label="half-star"
                  className="text-yellow-500 opacity-50"
                >
                  &#x2B50;
                </span>
              )
            )}
          </div>
        </div>
        <div className="mb-3 flex-grow">
          <p className="font-normal text-gray-200">
            {props.description === "No description available at this time"
              ? `${props.description}\n`
              : props.description.length > 100
              ? `${props.description.slice(0, 75)}...`
              : props.description}
          </p>
          {props.description === "No description available at this time" && (
            <div>
              <span className="dark:text-gray-200">
                Find this place on Google:{" "}
              </span>
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(
                  props.name + " " + props.city
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline focus:outline-none"
              >
                {props.name}, {props.city}
              </a>
            </div>
          )}
          {props.description.length > 100 && (
            <button
              onClick={toggleModal}
              className="text-blue-500 hover:underline focus:outline-none"
            >
              Read More
            </button>
          )}
        </div>

        <div className="mt-auto">
          <button
            onClick={handleAddItem}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add
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
      </div>

      {showModal && (
        <Modal
          content={
            <div className="bg-">
              <h2 className="text-gray-200 text-xl font-bold mb-2 pl-1">
                {props.name}
              </h2>
              <span>
                <div className="mb-3 flex items-center">
                  <h5 className="text-s tracking-tight text-gray-200 mr-2 pl-1">
                    {props.rating}
                  </h5>
                  {[...Array(Math.min(Math.round(props.rating), 5))].map(
                    (_, index) => (
                      <span
                        key={index}
                        role="img"
                        aria-label="star"
                        className="text-yellow-500"
                      >
                        &#x2B50;
                      </span>
                    )
                  )}
                  {[...Array(Math.max(5 - Math.round(props.rating), 0))].map(
                    (_, index) => (
                      <span
                        key="greyed-star"
                        role="img"
                        aria-label="half-star"
                        className="text-yellow-500 opacity-50"
                      >
                        &#x2B50;
                      </span>
                    )
                  )}
                </div>
              </span>
              <h5 className="pl-1 font-medium mb-2 text-gray-200">
                Full Description
              </h5>
              <p className="text-gray-200 bg-gray-700 p-4 rounded-lg">
                {props.description}
              </p>
            </div>
          }
          onClose={toggleModal}
        />
      )}
    </div>
  );
}

export default LocationCard;
