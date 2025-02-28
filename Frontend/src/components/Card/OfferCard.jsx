import React from "react";

function OfferCard({ Name, mrp, type, img, timeForDelivery, rating, offer }) {
  const sybmol = type === "Veg" ? "🟢" : "🔴";
  return (
    <>
      <div className="max-w-max bg-gray-100 p-3 rounded-xl text-left hover:scale-95">
        <div className="overflow-hidden relative rounded-lg ">
          <img
            className="  mb-2 w-48 h-36 object-cover mx-auto "
            src={img}
            alt=""
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent px-4 py-2 pt-10">
            <h1 className="text-white font-bold text-2xl">{offer}% OFF</h1>
          </div>
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

export default OfferCard;
