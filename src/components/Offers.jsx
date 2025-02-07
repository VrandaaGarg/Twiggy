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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        {/* Deal of the Day Section */}
        <section className="mb-12 animate-fade-in">
          <div className="flex items-center gap-3 mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Deal of the Day
            </h1>
            <span className="animate-bounce text-2xl">💥</span>
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
        <section className="py-12 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-3xl font-bold text-gray-900">All Offers</h2>
            <span className="animate-bounce text-2xl">🎉</span>
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
                    : 'bg-white text-gray-700 border border-red-500 hover:bg-red-50'}
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
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
