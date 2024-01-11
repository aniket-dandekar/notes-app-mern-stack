// import React from "react";
import { useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

// type Props = {};

type Links = {
  [key: string]: string;
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const authToken = localStorage.getItem("mern-auth-token");

  const location = useLocation();
  // console.log(location);

  const links: Links = {
    home: "/",
    about: "/about",
    contact: "/contact",
  };
  return (
    <div className="relative isolate z-50 p-4 bg-foreground shadow-md">
      <nav className="font-inter max-w-6xl mx-auto flex flex-col-reverse gap-0 md:flex-row justify-end md:justify-between md:items-center">
        <ul
          className={`absolute border-b shadow-2xl md:border-none md:static inset-0 top-16 px-4 bg-foreground md:flex items-center md:pt-0 gap-4 font-bold uppercase h-0 md:h-fit overflow-hidden duration-300 md:duration-0 ${
            menuOpen ? "h-fit pt-8 pb-8" : "h-0"
          }`}
        >
          {Object.entries(links).map(([title, link]) => (
            <li
              key={title + link}
              className={
                location.pathname === link ? "text-primary" : "text-copy"
              }
            >
              <Link to={link}>{title}</Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between">
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="bg-primary hover:bg-primary-dark duration-200 text-primary-content rounded p-1 px-2"
            >
              <IoMenuOutline className="text-xl" />
            </button>
          </div>
          {authToken ? (
            <div className="flex gap2">
              <Link to={"/logout"}>
                <button className="bg-primary hover:bg-primary-dark duration-200 text-primary-content rounded p-1 px-2">
                  Logout
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to={"/login"}>
                <button className="bg-primary hover:bg-primary-dark duration-200 text-primary-content rounded p-1 px-2">
                  Login
                </button>
              </Link>
              <Link to={"/signup"}>
                <button className="bg-primary hover:bg-primary-dark duration-200 text-primary-content rounded p-1 px-2">
                  Signup
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
