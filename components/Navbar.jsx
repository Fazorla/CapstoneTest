"use client";
import Link from "next/link";
import Image from "next/image";
import Logo from "../public/logo.svg";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

const navigation = [
  { name: "Home", href: "./" },
  { name: "Team", href: "/team" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="fixed w-full h-24 shadow-xl">
      <div className="flex justify-between items-center h-full w-full px-6 2xl:px-16">
        <Link href="/">
          <Image
            src={Logo}
            alt="logo"
            width={202}
            height={40}
            className="cursor-pointer"
            priority
          />
        </Link>
        <div className="hidden sm:ml-6 sm:flex">
          <div className="flex space-x-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-black hover:bg-gray-700 hover:text-white"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
        <div className="flex space-x-4">
          <button className=" hidden bg-blue-600 text-white rounded-md px-7 py-2 text-lg font-medium sm:flex">
            Sign-in
          </button>
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
        <div className="flex-col py-4 h-full">
          {navigation.map((item) => (
            <div className="text-black hover:bg-gray-700 hover:text-white">
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
