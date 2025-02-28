import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();
  const { user } = useProfile();

  // Redirect unauthenticated users
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Please login to view your cart
          </h2>
          <button
            onClick={() => navigate('/login')}
            className="mt-4 px-6 py-2 bg-primary text-white rounded-xl 
                     hover:bg-primary-dark transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="max-w-2xl mx-auto text-center p-8">
          {/* Empty Cart Icon */}
          <div className="mb-8 animate-fade-in">
            <div className="mx-auto w-48 h-48 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <div className="relative">
                <svg
                  className="w-24 h-24 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">0</span>
                </div>
              </div>
            </div>
          </div>

          {/* Empty Cart Content */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Your cart looks empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto text-lg">
              Add some delicious items from our menu and start your food journey!
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 
                         text-white px-8 py-4 rounded-full hover:shadow-lg transform 
                         transition-all duration-200 hover:-translate-y-1 font-medium text-lg"  
            >
              <span>Explore Menu</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>

          {/* Suggestions */}
          <div className="mt-12 pt-12 border-t border-gray-200 dark:border-gray-800">
            <p className="text-gray-500 dark:text-gray-400 mb-4">Popular Categories</p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Pizza', 'Burgers', 'Indian', 'Chinese'].map(category => (
                <Link
                  key={category}
                  to="/"
                  className="px-6 py-2 rounded-full border border-gray-300 text-gray-600
                           hover:border-blue-500 hover:text-blue-500 transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
          <span>Your Cart</span>
          <span className="text-lg font-medium text-gray-500 dark:text-gray-400">
            ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
          </span>
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {cartItems.map((item) => (
              <div 
                key={item.id} 
                className="p-6 flex flex-col sm:flex-row sm:items-center animate-fade-in"
              >
                <div className="flex-shrink-0 w-full sm:w-24 h-24 mb-4 sm:mb-0">
                  <img
                    src={item.img}
                    alt={item.Name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                <div className="sm:ml-6 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {item.Name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">₹{item.mrp}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-medium text-gray-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-semibold text-gray-900 dark:text-white">₹{item.mrp * item.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium text-gray-600 dark:text-gray-400">Subtotal</span>
              <span className="text-3xl font-bold text-gray-900 dark:text-white">₹{getCartTotal()}</span>
            </div>
            <button className="w-full bg-gradient-to-r from-primary to-primary-dark 
                             text-white py-4 rounded-xl font-semibold
                             hover:shadow-lg transform transition-all duration-200 
                             hover:-translate-y-0.5">
              Proceed to Checkout
            </button>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              Free delivery on orders above ₹499
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
