// import React from "react";
import { Link, useLocation } from "react-router-dom";

// type Props = {};

const Navbar = () => {
  const location = useLocation();
  return (
    <div className="flex justify-around">
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/about"}>About</Link>
          </li>
          <li>
            <Link to={"/contact"}>Contact</Link>
          </li>
        </ul>
      </nav>
      <h2>Location = {location.pathname}</h2>
    </div>
  );
};

export default Navbar;
