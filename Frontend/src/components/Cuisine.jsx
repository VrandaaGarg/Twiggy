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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 inline-block">
            Explore Our Cuisines
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
            Discover amazing dishes from different cuisines around the world
          </p>
        </div>

        {/* Cuisine Filter Buttons */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {CuisineData.map((cuisine) => (
              <button
                key={cuisine.name}
                onClick={() => cuisineHandle(cuisine.name)}
                className={`group p-3 flex flex-col items-center transition-all duration-300
                  ${cuisineName === cuisine.name 
                    ? 'scale-105' 
                    : 'hover:scale-105'}`}
              >
                <div className={`relative w-full aspect-square mb-3 rounded-full overflow-hidden
                  ${cuisineName === cuisine.name 
                    ? 'ring-4 ring-primary ring-offset-2 dark:ring-offset-gray-900' 
                    : 'ring-2 ring-gray-200 dark:ring-gray-700'}`}>
                  <img 
                    src={cuisine.img} 
                    alt={cuisine.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <span className={`text-sm font-medium text-center transition-colors
                  ${cuisineName === cuisine.name 
                    ? 'text-primary dark:text-primary-light font-semibold' 
                    : 'text-gray-700 dark:text-gray-300'}`}>
                  {cuisine.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Section */}
        <div className="pb-16">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-2xl font-bold dark:text-white">
              {cuisineName} Dishes
            </h2>
            <span className="text-sm px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light">
              {filterData.length} items
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterData.length > 0 ? (
              filterData.map((data, index) => (
                <div
                  key={data.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card {...data} />
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <div className="text-4xl mb-4">🍽️</div>
                <h3 className="text-xl font-semibold mb-2 dark:text-gray-200">
                  No dishes found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  We couldn't find any dishes for {cuisineName} cuisine
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cuisine;
