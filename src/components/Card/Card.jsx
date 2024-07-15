import React from "react";

function Card({ Name, mrp, type, img, timeForDelivery, rating }) {
  const sybmol = type === "Veg" ? "🟢" : "🔴";

  return (
    <>
      <div className="max-w-max bg-gray-100 p-3 rounded-xl text-left m-4 hover:scale-95">
        <div className="overflow-hidden">
          <img
            className=" rounded-lg mb-2 w-48 h-36 object-cover mx-auto"
            src={img}
            alt=""
          />
        </div>

        <h1 className="font-bold">{Name}</h1>
        <h3>
          {sybmol} {type}
        </h3>
        <h3>
          ⭐{rating} | {timeForDelivery} mins
        </h3>
        <div className="flex justify-between">
          <h3>₹{mrp}</h3>
          <button className="bg-black p-1 rounded-md">➕</button>
        </div>
      </div>
    </>
  );
}

export default Card;
