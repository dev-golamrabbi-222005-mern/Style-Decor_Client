import React from "react";
import { Link, NavLink } from "react-router-dom";
import Home from "../../pages/HOME/Home/Home";
import Logo from "../Logo/Logo";

// Active link style function
const getLinkStyle = ({ isActive }) => {
  return {
    color: isActive ? "#2563eb" : "", // Blue color when active
    borderBottom: isActive ? "2px solid #2563eb" : "none", // Underline when active
    paddingBottom: "2px",
  };
};

const Navbar = () => {
  const links = (
    <>
      <li>
        <NavLink to="/" style={getLinkStyle}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/profile" style={getLinkStyle}>
          Services
        </NavLink>
      </li>
      <li>
        <NavLink to="/profile" style={getLinkStyle}>
          About
        </NavLink>
      </li>
      <li>
        <NavLink to="/profile" style={getLinkStyle}>
          Contact
        </NavLink>
      </li>
      <li>
        <NavLink to="/profile" style={getLinkStyle}>
          Dashboard
        </NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar bg-[#FCFAE0] shadow-sm mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </label>
            <ul className="menu menu-sm dropdown-content bg-white text-black rounded-box z-50 mt-3 w-52 p-2 shadow">
              {links}
            </ul>
          </div>
          <Link className="pl-3 md:pl-7 lg:pl-13" to="/">
            <Logo />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-10 text-black">
            {links}
          </ul>
        </div>
        <div className="navbar-end">
          <button className="btn bg-primary rounded">Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
