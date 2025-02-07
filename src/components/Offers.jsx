import React, { useEffect, useState } from "react";
import Card from "./Card/Card";
import Data from "./Data/Data";

function Offers() {
  const [activeFilter, setActiveFilter] = useState(10);
  const [filteredItems, setFilteredItems] = useState([]);

  // Only get items that have offers
  const itemsWithOffers = Data.filter(item => item.offer > 0);

  const discountFilters = [
    { value: 10, label: '≥10% OFF' },
    { value: 20, label: '≥20% OFF' },
    { value: 30, label: '≥30% OFF' },
    { value: 50, label: '≥50% OFF' },
    { value: 75, label: '≥75% OFF' },
  ];

  useEffect(() => {
    const filtered = itemsWithOffers.filter((item) => item.offer >= activeFilter);
    setFilteredItems(filtered);
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        {/* Deal of the Day Section */}
        <section className="mb-12 animate-fade-in">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 inline-block">
              Deal of the Day
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
              Grab the best offers before they're gone
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {itemsWithOffers
              .filter(item => item.offer >= 70)
              .map((item, index) => (
                <div
                  key={item.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card {...item} />
                </div>
              ))}
          </div>
        </section>

        {/* All Offers Section */}
        <section className="py-12 border-t dark:border-gray-800">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 inline-block">
              All Offers
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
              Discover amazing discounts on your favorite dishes
            </p>
          </div>

          {/* Discount Filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            {discountFilters.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setActiveFilter(value)}
                className={`px-4 py-2 rounded-full transition-all duration-200
                  ${activeFilter === value 
                    ? 'bg-red-500 text-white shadow-lg scale-105' 
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'}`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Filtered Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card {...item} />
              </div>
            ))}
            {filteredItems.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500">
                No items available with {activeFilter}% or more discount
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Offers;
