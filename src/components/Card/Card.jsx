import React, { useState } from "react";
import { useCart } from "../../context/CartContext";

function Card({ id, Name, mrp, type, img, timeForDelivery, rating }) {
  const [showPopup, setShowPopup] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const { addToCart } = useCart();

  const vegIcon = type === "Veg" ? (
    <div className="w-4 h-4 border border-green-500 p-0.5">
      <div className="w-full h-full rounded-full bg-green-500"></div>
    </div>
  ) : (
    <div className="w-4 h-4 border border-red-500 p-0.5">
      <div className="w-full h-full rounded-full bg-red-500"></div>
    </div>
  );

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({ id, Name, mrp, type, img, timeForDelivery, rating });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  return (
    <div className="relative">
      {/* Main Card */}
      <div className="card-base group cursor-pointer">
        {/* Image Container */}
        <div className="relative overflow-hidden h-48 sm:h-56">
          <img
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            src={img}
            alt={Name}
            loading="lazy"
          />
          <div className="absolute top-2 right-2 bg-white p-1 rounded-lg shadow-md">
            {vegIcon}
          </div>
        </div>

        {/* Content Container */}
        <div className="p-4" onClick={() => setShowPopup(true)}>
          <h3 className="font-bold text-lg text-gray-800 line-clamp-1 mb-2">{Name}</h3>
          <div className="flex items-center gap-3 mb-3">
            <span className="badge bg-green-100 text-green-800">⭐ {rating}</span>
            <span className="badge bg-blue-100 text-blue-800">{timeForDelivery} mins</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t">
            <span className="price-tag">₹{mrp}</span>
            <button 
              className="btn-primary flex items-center gap-2"
              onClick={handleAddToCart}
            >
              Add <span className="text-lg">+</span>
            </button>
          </div>
        </div>
      </div>

      {/* Success Notification */}
      {showNotification && (
        <div className="absolute top-2 right-2 left-2 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg animate-slide-down text-center">
          Added to cart!
        </div>
      )}

      {/* Modal */}
      {showPopup && (
        <div 
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setShowPopup(false)}
        >
          <div 
            className="relative bg-white rounded-2xl max-w-xl w-full animate-slide-up overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 z-10 bg-white/80 rounded-full p-2 backdrop-blur-sm hover:bg-white transition-colors"
              onClick={() => setShowPopup(false)}
            >
              ✕
            </button>

            {/* Modal Content */}
            <div className="relative">
              <img
                className="w-full h-64 object-cover"
                src={img}
                alt={Name}
              />
              <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/60 to-transparent"/>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                {vegIcon}
                <h2 className="text-2xl font-bold text-gray-800">{Name}</h2>
              </div>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="badge bg-yellow-100 text-yellow-800">⭐ {rating}</div>
                <div className="badge bg-blue-100 text-blue-800">🕒 {timeForDelivery} mins</div>
                <div className="badge bg-green-100 text-green-800">₹{mrp}</div>
              </div>

              <button 
                className="w-full btn-primary py-3 text-lg font-semibold"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
