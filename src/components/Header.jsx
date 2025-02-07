import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import logo from "/Images/logo.png";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartItems } = useCart();

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { name: "HOME", path: "" },
    { name: "ABOUT US", path: "about" },
    { name: "OFFERS", path: "offer" },
    { name: "CUISINES", path: "cuisine" },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 
      ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/70 backdrop-blur-sm'}
      ${isOpen ? 'bg-white' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="flex-shrink-0 flex items-center">
            <img src={logo} alt="logo" className="h-8 w-auto sm:h-10 transform hover:scale-105 transition-transform" />
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map(({ name, path }) => (
              <NavLink
                key={name}
                to={`/${path}`}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  hover:bg-gray-100 hover:text-primary
                  ${isActive ? 'text-primary bg-blue-50' : 'text-gray-700'}`
                }
              >
                {name}
              </NavLink>
            ))}
          </nav>

          {/* Right section */}
          <div className="flex items-center gap-2 sm:gap-4">
            <NavLink 
              to="/cart" 
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <span className="text-2xl">🛒</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs 
                               w-5 h-5 flex items-center justify-center rounded-full
                               border-2 border-white shadow-md font-bold animate-fade-in">
                  {cartItemCount}
                </span>
              )}
            </NavLink>

            <button className="hidden md:flex items-center px-6 py-2.5 text-sm font-semibold 
                             text-white bg-gradient-to-r from-blue-600 to-blue-700 
                             rounded-lg hover:from-blue-700 hover:to-blue-800
                             transition-all duration-200 hover:shadow-lg active:scale-95
                             border border-blue-700">
              Login
            </button>

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`block h-0.5 w-full bg-gray-600 transition-all duration-300
                  ${isOpen ? 'rotate-45 translate-y-2' : ''}`}>
                </span>
                <span className={`block h-0.5 w-full bg-gray-600 transition-all duration-300
                  ${isOpen ? 'opacity-0' : ''}`}>
                </span>
                <span className={`block h-0.5 w-full bg-gray-600 transition-all duration-300
                  ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}>
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
        ${isOpen ? 'max-h-96 border-t border-gray-200' : 'max-h-0'}`}>
        <nav className="px-4 pt-2 pb-3 space-y-1 bg-white">
          {navItems.map(({ name, path }) => (
            <NavLink
              key={name}
              to={`/${path}`}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-base font-medium transition-colors
                ${isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`
              }
              onClick={() => setIsOpen(false)}
            >
              {name}
            </NavLink>
          ))}
          <button className="w-full mt-2 px-3 py-2.5 text-base font-semibold text-white 
                           bg-gradient-to-r from-blue-600 to-blue-700
                           rounded-lg hover:from-blue-700 hover:to-blue-800 
                           transition-all duration-200">
            Login
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
