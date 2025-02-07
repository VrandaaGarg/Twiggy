import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "/Images/logo.png";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-0 w-full z-10">
      <div className="flex justify-between bg-gray-100 p-3  w-full z-10 shadow-md">
        {/* Logo */}
        <div className="ml-3 flex items-center">
          <img src={logo} alt="logo" width="50" height="50" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <ul className="flex space-x-4">
            {[
              { name: "HOME", path: "" }, // Updated to direct home to ""
              { name: "ABOUT US", path: "about" },
              { name: "OFFERS", path: "offer" },
              { name: "CUISINES", path: "cuisine" },
            ].map(({ name, path }, index) => (
              <li key={index}>
                <NavLink
                  to={`/${path}`}
                  className={({ isActive }) =>
                    `font-bold text-lg px-3 ${
                      isActive ? "text-red-700" : "text-black"
                    }`
                  }
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Cart & Login Button */}
        <div className="flex items-center mr-5 gap-3">
          <NavLink to="/cart">
            <button className="relative">
              <p className="text-2xl">🛒</p>
              <div className="absolute top-0 right-0">
                <p className="bg-orange-600 text-xs text-white w-5 h-5 flex items-center justify-center rounded-full">
                  4
                </p>
              </div>
            </button>
          </NavLink>

          <button className="bg-red-700 text-white px-3 py-2 text-lg font-bold rounded-lg hidden md:block">
            Login
          </button>

          {/* Hamburger Button (Mobile) */}
          <button
            className="md:hidden text-3xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md absolute top-14 w-full z-20 flex flex-col items-center py-3">
          {[
            { name: "HOME", path: "" }, // Updated here too
            { name: "ABOUT US", path: "about" },
            { name: "OFFERS", path: "offer" },
            { name: "CUISINES", path: "cuisine" },
          ].map(({ name, path }, index) => (
            <NavLink
              key={index}
              to={`/${path}`}
              className="py-2 text-lg font-bold text-black"
              onClick={() => setIsOpen(false)}
            >
              {name}
            </NavLink>
          ))}

          <button
            className="bg-red-700 text-white px-3 py-2 text-lg font-bold rounded-lg mt-2"
            onClick={() => setIsOpen(false)}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
