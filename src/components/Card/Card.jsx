import React, { useState } from "react";

function Card({ Name, mrp, type, img, timeForDelivery, rating }) {
  const [showPopup, setShowPopup] = useState(false);
  const vegIcon = type === "Veg" ? (
    <div className="w-4 h-4 border border-green-500 p-0.5">
      <div className="w-full h-full rounded-full bg-green-500"></div>
    </div>
  ) : (
    <div className="w-4 h-4 border border-red-500 p-0.5">
      <div className="w-full h-full rounded-full bg-red-500"></div>
    </div>
  );

  return (
    <>
      <div 
        className="card-base group cursor-pointer animate-fade-in"
        onClick={() => setShowPopup(true)}
      >
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
        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-800 line-clamp-1 mb-2">{Name}</h3>

          <div className="flex items-center gap-3 mb-3">
            <span className="badge bg-green-100 text-green-800 flex items-center gap-1">
              <span>⭐</span> {rating}
            </span>
            <span className="badge bg-blue-100 text-blue-800">
              {timeForDelivery} mins
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <span className="price-tag">₹{mrp}</span>
            <button 
              className="btn-primary flex items-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              Add <span className="text-lg">+</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {showPopup && (
        <div 
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setShowPopup(false)}
        >
          <div 
            className="relative bg-white rounded-2xl max-w-xl w-full animate-slide-up overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <button
              className="absolute top-4 right-4 z-10 bg-white/80 rounded-full p-2 backdrop-blur-sm hover:bg-white transition-colors"
              onClick={() => setShowPopup(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
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
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 text-xl">⭐</span>
                  <span className="font-semibold">{rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-500">🕒</span>
                  <span>{timeForDelivery} mins delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">₹</span>
                  <span className="font-bold text-xl">{mrp}</span>
                </div>
              </div>

              <button 
                className="w-full btn-primary py-3 text-lg font-semibold"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Card;
