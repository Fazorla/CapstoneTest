"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../public/logo.svg";
import profOut from "../public/profileOut.svg";
import profIn from "../public/profileIn.svg";
import { UserAuth } from "../app/Context/AuthContext";
import NavDropDown from "./NavDropDown";

function Navbar() {
  const { user, logout } = UserAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignout = async () => {
    try {
      await logout();
      console.log("Logged out");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <nav className="flex items-center h-[100px] w-full shadow-xl px-6 2xl:px-16">
      <div className="flex items-center">
        <Link href="/">
          <div className="cursor-pointer">
            <Image height={90} src={Logo} alt="logo" priority />
          </div>
        </Link>
        <h1 className="ml-2 text-2xl font-bold flex items-center">DayOut</h1>
      </div>
      <div className="flex items-center">
        <div
          onClick={() => setMenuOpen((prev) => !prev)}
          className="absolute cursor-pointer mr-4 right-[0.5rem]"
        >
          {user ? (
            <Image height={70} src={profIn} alt="profile" priority />
          ) : (
            <Image height={70} src={profOut} alt="profile" priority />
          )}
        </div>
        {menuOpen && (
          <NavDropDown
            user={user}
            handleSignout={handleSignout}
            handleCloseMenu={() => setMenuOpen(false)}
          />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
