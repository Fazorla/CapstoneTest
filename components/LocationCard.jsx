import React, { useState } from "react";

// Modal component
const Modal = ({ content, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-4 rounded-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-500"
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
    <div className="flex flex-col w-[23rem] h-[27rem] bg-white rounded-lg m-2 dark:bg-gray-800">
      <img
        className="w-full h-52 rounded-t-lg object-cover"
        src={props.image}
        alt=""
      />
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2">
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {props.name}
          </h5>
        </div>
        <div className="mb-3 flex-grow">
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {props.description.length > 100
              ? `${props.description.slice(0, 100)}...`
              : props.description}
          </p>
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
            <div>
              <h2 className="text-xl font-bold mb-2">{props.name}</h2>
              <p className="text-gray-700 dark:text-gray-400">
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
