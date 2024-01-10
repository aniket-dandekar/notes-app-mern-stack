// import React from "react";
import { Link, useLocation } from "react-router-dom";

// type Props = {};

type Links = {
  [key: string]: string;
};

const Navbar = () => {
  const location = useLocation();
  // console.log(location);

  const links: Links = {
    home: "/",
    about: "/about",
    contact: "/contact",
  };
  return (
    <div className="flex p-4 bg-primary-light">
      <nav className="font-inter">
        <ul className="flex items-center gap-4 font-bold uppercase">
          {Object.entries(links).map(([title, link]) => (
            <li
              key={title + link}
              className={
                location.pathname === link
                  ? "text-primary-content"
                  : "text-copy"
              }
            >
              <Link to={link}>{title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
