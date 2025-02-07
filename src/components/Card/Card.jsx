import React, { useState } from "react";

function Card({ Name, mrp, type, img, timeForDelivery, rating }) {
  const [showPopup, setShowPopup] = useState(false);
  const symbol = type === "Veg" ? "🟢" : "🔴";

  return (
    <>
      {/* Main Card */}
      <div
        className="max-w-max bg-gray-100 p-3 rounded-xl text-left m-4 hover:scale-95 cursor-pointer"
        onClick={() => setShowPopup(true)}
      >
        <div className="overflow-hidden">
          <img
            className="rounded-lg mb-2 w-48 h-36 object-cover mx-auto"
            src={img}
            alt={Name}
          />
        </div>

        <h1 className="font-bold">{Name}</h1>
        <h3>
          {symbol} {type}
        </h3>
        <h3>
          ⭐ {rating} | {timeForDelivery} mins
        </h3>
        <div className="flex justify-between">
          <h3>₹{mrp}</h3>
          <button className="bg-black p-1 rounded-md text-white">➕</button>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 text-3xl md:text-xl">
          <div className="bg-white p-6 rounded-lg shadow-lg md:w-96 text-center relative w-2/3 md:min-h-max">
            <button
              className="absolute top-2 right-3 text-gray-600 text-3xl md:text-xl"
              onClick={() => setShowPopup(false)}
            >
              ✖
            </button>
            <div className="flex place-content-center p-8 md:p-2">
              <img
                className=" md:h-64 aspect-square object-cover rounded-3xl md:rounded-lg mb-3"
                src={img}
                alt={Name}
              />
            </div>
            <h1 className="font-bold text-4xl md:text-2xl">{Name}</h1>
            <h3 className="text-gray-600">
              {symbol} {type}
            </h3>
            <h3 className="text-yellow-500">
              ⭐ {rating} | {timeForDelivery} mins
            </h3>
            <h3 className=" font-semibold mt-2">₹{mrp}</h3>
            <button
              className="bg-black text-white px-4 py-2 rounded-md mt-3 hover:bg-gray-800 transition"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Card;
