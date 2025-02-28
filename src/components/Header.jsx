import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import logo from "/Images/logo.png";
import ThemeBtn from "./ThemeBtn";
import Data from "./Data/Data";
import { FaUserCircle } from "react-icons/fa";
import { useProfile } from "../context/ProfileContext";
function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const { cartItems, addToCart, removeFromCart } = useCart();
  const { user } = useProfile();

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const getItemQuantity = (itemId) => {
    const cartItem = cartItems.find((item) => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle search
  const handleSearch = (value) => {
    setSearchTerm(value);
    const filtered = Data.filter((item) =>
      item.Name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(filtered.slice(0, 6)); // Limit to 6 results
  };

  // Close search on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setShowSearch(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const navItems = [
    { name: "HOME", path: "" },
    { name: "ABOUT US", path: "about" },
    { name: "OFFERS", path: "offer" },
    { name: "CUISINES", path: "cuisine" },
  ];

  //Handling login button

  const navigate = useNavigate();

  const handleAddToCart = (item) => {
    if (!user) {
      setShowLoginPrompt(true);
      setTimeout(() => {
        setShowLoginPrompt(false);
        navigate("/login");
      }, 2000);
      return;
    }
    addToCart(item);
    setShowSearch(false); // Close search after adding item
  };

  return (
    <>
      <header
        className={`fixed top-0 w-full z-40 transition-all duration-300 
        ${
          scrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg"
            : "bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm"
        }
        ${isOpen ? "bg-white dark:bg-gray-900" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <NavLink to="/" className="flex-shrink-0 flex items-center gap-2">
              <span className="font-bold text-xl text-gray-900 dark:text-white">
                <span className="text-red-600">Smart</span>Bite
              </span>
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map(({ name, path }) => (
                <NavLink
                  key={name}
                  to={`/${path}`}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    hover:bg-gray-100 dark:hover:bg-gray-800
                    ${
                      isActive
                        ? "text-primary dark:text-primary-light bg-blue-50 dark:bg-blue-900/20"
                        : "text-gray-700 dark:text-gray-300"
                    }`
                  }
                >
                  {name}
                </NavLink>
              ))}
            </nav>

            {/* Right section */}
            <div className="flex items-center gap-1 md:gap-4">
              <button
                onClick={() => setShowSearch(true)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Search"
              >
                🔍
              </button>
              <ThemeBtn />

              <NavLink
                to="/cart"
                className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="text-2xl">🛒</span>
                {cartItemCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs 
                               w-5 h-5 flex items-center justify-center rounded-full
                               border-2 border-white dark:border-gray-900 shadow-md font-bold"
                  >
                    {cartItemCount}
                  </span>
                )}
              </NavLink>

              {user ? (
                <div className="flex items-center gap-2">
                  <NavLink
                    to="/profile"
                    className="flex items-center gap-2 px-2 md:px-4 py-2 rounded-xl
                             bg-gradient-to-r from-primary/10 to-primary-dark/10
                             hover:from-primary/20 hover:to-primary-dark/20
                             dark:from-gray-800 dark:to-gray-700
                             transition-all duration-300"
                  >
                    <FaUserCircle className="w-5 h-5 text-primary dark:text-primary-light" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {user.name?.split(" ")[0]}
                    </span>
                  </NavLink>
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="flex items-center gap-2 px-2 md:px-6 py-1 md:py-2 rounded-xl
                           bg-gradient-to-r from-primary to-primary-dark
                           text-white font-medium
                           hover:shadow-lg hover:scale-[1.02]
                           active:scale-[0.98] transition-all duration-300"
                >
                  <FaUserCircle className="w-5 h-5" />
                  <span className="text-xs">Login</span>
                </button>
              )}

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Menu"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  {[1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className={`block h-0.5 w-full bg-gray-600 dark:bg-gray-400 transition-all duration-300
                      ${isOpen && i === 1 ? "rotate-45 translate-y-2" : ""}
                      ${isOpen && i === 2 ? "opacity-0" : ""}
                      ${isOpen && i === 3 ? "-rotate-45 -translate-y-2" : ""}`}
                    />
                  ))}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${
            isOpen
              ? "max-h-96 border-t border-gray-200 dark:border-gray-700"
              : "max-h-0"
          }`}
        >
          <nav className="px-4 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900">
            {navItems.map(({ name, path }) => (
              <NavLink
                key={name}
                to={`/${path}`}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-base font-medium transition-colors
                  ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {name}
              </NavLink>
            ))}
            <div className="flex items-center justify-between py-2 px-3">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Dark Mode
              </span>
              <ThemeBtn />
            </div>
            {!user && (
              <button
                onClick={() => {
                  navigate("/login");
                  setIsOpen(false);
                }}
                className="w-full mt-2 px-4 py-2.5 rounded-xl
                         bg-gradient-to-r from-primary to-primary-dark
                         text-white font-medium
                         hover:shadow-lg active:scale-[0.98] 
                         transition-all duration-300
                         flex items-center justify-center gap-2"
              >
                <FaUserCircle className="w-5 h-5" />
                <span>Login</span>
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Login Prompt Popup */}
      {showLoginPrompt && (
        <div
          className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-md p-4 
                    rounded-xl shadow-lg transform animate-slide-up backdrop-blur-lg
                    bg-red-500/90 text-white z-50"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl">⚠️</span>
            <p className="font-medium">
              Please login first to add items to cart
            </p>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {showSearch && (
        <div className="fixed inset-0 bg-black/60 dark:bg-black/80 z-50 backdrop-blur-sm">
          <div className="min-h-screen flex items-start justify-center pt-20 px-4">
            <div className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-xl shadow-2xl animate-slide-down">
              {/* Search Input */}
              <div className="p-4 border-b dark:border-gray-700">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for dishes..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 
                             rounded-lg focus:outline-none focus:ring-2 focus:ring-primary
                             text-gray-900 dark:text-white"
                    autoFocus
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">
                    🔍
                  </span>
                  <button
                    onClick={() => setShowSearch(false)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 
                             hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Search Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {searchTerm && (
                  <div className="p-2">
                    {searchResults.length > 0 ? (
                      searchResults.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 p-2 hover:bg-gray-50 
                                   dark:hover:bg-gray-700/50 rounded-lg"
                        >
                          <img
                            src={item.img}
                            alt={item.Name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {item.Name}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                              <span>⭐ {item.rating}</span>
                              <span>•</span>
                              <span>{item.timeForDelivery} mins</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-lg font-medium text-gray-900 dark:text-white">
                                ₹{item.mrp}
                              </span>
                              {item.offer > 0 && (
                                <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                                  {item.offer}% OFF
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {user && getItemQuantity(item.id) > 0 ? (
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="w-8 h-8 flex items-center justify-center rounded-lg 
                                            bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 
                                            dark:hover:bg-gray-600 transition-colors"
                                >
                                  -
                                </button>
                                <span className="w-8 text-center font-medium">
                                  {getItemQuantity(item.id)}
                                </span>
                                <button
                                  onClick={() => addToCart(item)}
                                  className="w-8 h-8 flex items-center justify-center rounded-lg 
                                            bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 
                                            dark:hover:bg-gray-600 transition-colors"
                                >
                                  +
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleAddToCart(item)}
                                className="px-4 py-2 bg-primary text-white rounded-lg 
                                          hover:bg-primary-dark transition-colors duration-200"
                              >
                                Add
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        No dishes found for "{searchTerm}"
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Login Prompt Toast */}
              {showLoginPrompt && (
                <div
                  className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-md p-4 
                             rounded-xl shadow-lg transform animate-slide-up backdrop-blur-lg
                             bg-red-500/90 text-white z-50"
                >
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-2xl">⚠️</span>
                    <p className="font-medium">
                      Please login first to add items to cart
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
