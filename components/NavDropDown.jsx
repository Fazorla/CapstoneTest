"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import login from "../public/login.svg";
import logout from "../public/logout.svg";
import goldMedal from "../public/goldMedal.svg";
import Image from "next/image";

function NavDropDown({ user, handleSignout, handleCloseMenu }) {
  const isLoggedIn = user && user.uid !== null && user.uid !== undefined;
  const navDropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        navDropdownRef.current &&
        !navDropdownRef.current.contains(event.target)
      ) {
        // Click occurred outside the NavDropDown, close it
        handleCloseMenu();
      }
    }

    // Attach event listener when the menu is open
    document.addEventListener("click", handleClickOutside);

    // Cleanup function
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleCloseMenu]);

  const handleItemClick = () => {
    handleCloseMenu();
  };

  return (
    <div
      ref={navDropdownRef}
      className="DDm bg-gray-800 border border-gray-600 rounded-lg shadow-md py-2 px-4"
    >
      {isLoggedIn ? (
        <ul className="flex flex-col gap-2 text-gray-200">
          <Link href={`/profiles/${user.uid}`}>
            <li
              className="flex items-center justify-between hover:bg-gray-700 rounded-md cursor-pointer p-2 transition-colors duration-300"
              onClick={handleItemClick}
            >
              <div className="flex items-center">
                <span className="mr-5">Rewards</span>
                <div className="flex items-center">
                  <Image height={20} src={goldMedal} alt="goldMedal" priority />
                </div>
              </div>
            </li>
          </Link>
          <li
            className="flex items-center justify-between hover:bg-gray-700 rounded-md cursor-pointer p-2 transition-colors duration-300"
            onClick={() => {
              handleSignout();
              handleItemClick();
            }}
          >
            <div className="flex items-center">
              <span className="mr-5">Signout</span>
              <div className="flex items-center">
                <Image height={20} src={logout} alt="logout" priority />
              </div>
            </div>
          </li>
        </ul>
      ) : (
        <ul className="text-gray-200">
          <Link href="/signinpage">
            <li
              className="flex items-center justify-between hover:bg-gray-700 rounded-md cursor-pointer p-2 transition-colors duration-300"
              onClick={handleItemClick}
            >
              <div className="flex items-center">
                <span className="mr-5">Signin</span>
                <div className="flex items-center">
                  <Image height={20} src={login} alt="login" priority />
                </div>
              </div>
            </li>
          </Link>
        </ul>
      )}
    </div>
  );
}

export default NavDropDown;
