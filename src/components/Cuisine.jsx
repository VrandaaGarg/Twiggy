import React, { useState } from "react";
import CuisineCrd from "./Card/CuisineCrd";
import Data from "./Data/Data";
import Card from "./Card/Card";
import CuisineData from "./Data/CuisineData";

function Cuisine() {
  const [cuisineName, setCuisineName] = useState("Indian");

  const cuisineHandle = (cuisine) => {
    setCuisineName(cuisine);
  };

  const filterData = Data.filter((data) => data.cuisine === cuisineName);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Explore <span className="text-primary">Cuisines</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-10">
            Discover amazing dishes from different cuisines around the world
          </p>
        </div>

        {/* Cuisine Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {CuisineData.map((cuisine) => (
            <button
              key={cuisine.name}
              onClick={() => cuisineHandle(cuisine.name)}
              className={`group p-2 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-lg
                ${cuisineName === cuisine.name ? 'bg-white shadow-md scale-105' : 'bg-gray-50'}`}
            >
              <CuisineCrd img={cuisine.img} label={cuisine.name} />
              <span className={`block mt-2 text-sm font-medium transition-colors
                ${cuisineName === cuisine.name ? 'text-primary' : 'text-gray-600'}`}>
                {cuisine.name}
              </span>
            </button>
          ))}
        </div>

        {/* Results Section */}
        <div className="pb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {cuisineName} Dishes
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterData.map((data, index) => (
              <div
                key={data.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card {...data} />
              </div>
            ))}
            {filterData.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500">
                No dishes found for this cuisine
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cuisine;
