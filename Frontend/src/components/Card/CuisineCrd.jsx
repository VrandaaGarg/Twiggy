import React from "react";

function CuisineCrd({ img, label }) {
  return (
    <div className="p-4 text-center max-w-max">
      <div className="relative hover:scale-95">
        <img
          className="w-36 h-36 object-cover rounded-full opacity-60 border-2 border-red-700"
          src={img}
          alt=""
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="font-bold text-2xl">{label}</h1>
        </div>
      </div>
    </div>
  );
}

export default CuisineCrd;
