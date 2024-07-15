import React, { useState } from "react";
import CuisineCrd from "../Card/CuisineCrd";
import Data from "../Data/Data";
import Card from "../Card/Card";
import CuisineData from "../Data/CuisineData";

function Cuisine() {
  const [cuisineName, setCuisineName] = useState("Indian");

  const cuisineHandle = (cuisine) => {
    setCuisineName(cuisine);
  };

  const filterData = Data.filter((data) => data.cuisine === cuisineName);

  return (
    <div className="pt-28">
      <div className=" pb-5 mb-7 flex justify-center flex-col">
        <h1 className=" text-red-700 font-bold text-4xl text-center">
          Cuisines
        </h1>
        <div className=" flex justify-center gap-6">
          {CuisineData.map((cuisine) => (
            <button
              key={cuisine.name}
              onClick={() => cuisineHandle(cuisine.name)}
              className=" px-4 py-2 rounded"
            >
              <CuisineCrd img={cuisine.img} label={cuisine.name} />
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-around px-6">
        {filterData.map((data) => (
          <Card
            key={data.id}
            Name={data.Name}
            type={data.type}
            timeForDelivery={data.timeForDelivery}
            img={data.img}
            mrp={data.mrp}
            rating={data.rating}
          />
        ))}
      </div>
    </div>
  );
}

export default Cuisine;
