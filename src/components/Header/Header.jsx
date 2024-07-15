import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../Images/logo.png";

function Header() {
  return (
    <div className="">
      <div className="flex justify-between bg-white p-2 fixed w-full z-10">
        <div className="ml-3">
          <img src={logo} alt="logo" width="50" height="50" />
        </div>
        <div className="flex items-center">
          <ul className="flex">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  ` font-bold text-2xl px-4 ${
                    isActive ? "text-red-700" : "text-black"
                  }`
                }
              >
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  ` font-bold text-2xl px-4 ${
                    isActive ? "text-red-700" : "text-black"
                  }`
                }
              >
                ABOUT US
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/offer"
                className={({ isActive }) =>
                  `font-bold text-2xl px-4 ${
                    isActive ? "text-red-700" : "text-black "
                  }`
                }
              >
                OFFERS
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cuisine"
                className={({ isActive }) =>
                  ` font-bold text-2xl px-4 ${
                    isActive ? "text-red-700" : "text-black"
                  }`
                }
              >
                CUISINES
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex items-center mr-7 gap-3">
          <NavLink to="/cart">
            <button className="relative">
              <p className="text-3xl">🛒</p>
              <div className="absolute top-0 right-0">
                <p className="bg-orange-600 text-sm text-white z-10 w-5 h-5 flex items-center justify-center rounded-full">
                  4
                </p>
              </div>
            </button>
          </NavLink>

          <button className="bg-red-700 text-white p-2 px-3 text-xl font-bold rounded-lg">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
