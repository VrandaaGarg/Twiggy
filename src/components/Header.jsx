import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "/Images/logo.png";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img src={logo} alt="logo" className="h-10 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {[
              { name: "HOME", path: "" },
              { name: "ABOUT US", path: "about" },
              { name: "OFFERS", path: "offer" },
              { name: "CUISINES", path: "cuisine" },
            ].map(({ name, path }) => (
              <NavLink
                key={name}
                to={`/${path}`}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 hover:text-primary ${
                    isActive ? 'text-primary' : 'text-gray-700'
                  }`
                }
              >
                {name}
              </NavLink>
            ))}
          </nav>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <NavLink to="/cart" className="relative group">
              <span className="text-2xl group-hover:scale-110 transition-transform duration-200">🛒</span>
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">4</span>
            </NavLink>

            <button className="hidden md:flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors duration-200">
              Login
            </button>

            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              <span className="text-2xl">☰</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 animate-fade-in">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {[
              { name: "HOME", path: "" },
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
        </div>
      )}
    </div>
  );
}

export default Header;
