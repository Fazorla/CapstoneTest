"use client";
import Link from "next/link";
import Image from "next/image";
import Logo from "../public/logoHor.png";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { UserAuth } from "../app/Context/AuthContext";

function Navbar() {
  const { user, logout } = UserAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSignout = async () => {
    try {
      await logout();
      console.log("Logged out");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <nav className="w-full h-24 shadow-xl ">
      <div className="flex justify-between items-center h-full w-full px-6 2xl:px-16">
        <Link href="/">
          <Image
            src={Logo}
            alt="logo"
            width={202}
            height={"auto"}
            className="cursor-pointer"
            priority
          />
        </Link>
        <div className="hidden sm:ml-6 sm:flex">
          {user ? (
            <button
              onClick={handleSignout}
              className="bg-blue-500 text-white rounded-md px-7 py-2 text-lg font-medium focus:outline-none focus:shadow-outline hover:bg-blue-600"
            >
              Sign-out
            </button>
          ) : (
            <Link href="/signinpage">
              <button className="bg-blue-500 text-white rounded-md px-7 py-2 text-lg font-medium focus:outline-none focus:shadow-outline hover:bg-blue-600">
                Sign-in
              </button>
            </Link>
          )}
        </div>
        <div onClick={handleNav} className="sm:hidden cursor-pointer">
          <AiOutlineMenu size={25} />
        </div>
      </div>
      <div
        className={
          menuOpen
            ? "fixed left-0 top-0 w-[80%] sm:hidden h-screen bg-white #ecf0f3 ease-in duration-500"
            : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
        }
      >
        <div className="flex w-full items-center justify-end">
          <div onClick={handleNav} className="cursor-pointer">
            <AiOutlineClose size={25} />
          </div>
        </div>
        <div className="flex justify-center">
          {user ? (
            <button
              onClick={handleSignout}
              className=" bg-blue-500 text-white rounded-md px-7 py-2 text-lg font-medium focus:outline-none focus:shadow-outline hover:bg-blue-600"
            >
              Sign-out
            </button>
          ) : (
            <Link href="/signinpage">
              <button className=" bg-blue-500 text-white rounded-md px-7 py-2 text-lg font-medium focus:outline-none focus:shadow-outline hover:bg-blue-600">
                Sign-in
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
