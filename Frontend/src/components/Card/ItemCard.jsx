import React from "react";

function ItemCard({ img, Name }) {
  return (
    <div className="">
      <div className="max-w-max text-center p-3 flex justify-center flex-col w-36">
        <img
          className=" rounded-full h-28 w-28 object-cover"
          src={img}
          alt=""
        />
        <h3 className="text-slate-500/80 font-semibold text-xl mt-1">{Name}</h3>
      </div>
    </div>
  );
}

export default ItemCard;
