import React, { useState, useEffect } from "react";
import Data from "./Data/Data";
import Card from "./Card/Card";
import ItemCard from "./Card/ItemCard";

function Home() {
  const [randomIndices, setRandomIndices] = useState([]);
  const [veg, setVeg] = useState(true);
  const [nonVeg, setNonVeg] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [rate, setRate] = useState(false);
  const [time, setTime] = useState(false);
  const [mrp, setMrp] = useState(false);

  useEffect(() => {
    const getRandomIndices = () => {
      let arr = [];
      for (let i = 0; i < 7; i++) {
        let index = Math.floor(Math.random() * Data.length);
        arr.push(index);
      }
      return arr;
    };

    setRandomIndices(getRandomIndices());
  }, []);

  useEffect(() => {
    const filterData = () => {
      let filtered = Data;

      if (!veg) {
        filtered = filtered.filter((item) => item.type === "Non-Veg");
      }

      if (!nonVeg) {
        filtered = filtered.filter((item) => item.type === "Veg");
      }

      if (rate) {
        filtered = filtered.filter((item) => item.rating >= 3.5);
      }
      if (time) {
        filtered = filtered.filter((item) => item.timeForDelivery <= 30);
      }
      if (mrp) {
        filtered = filtered.filter((item) => item.mrp <= 200);
      }
      setFilteredData(filtered);
    };

    filterData();
  }, [veg, nonVeg, rate, time, mrp]);

  const filterButtons = [
    { 
      label: 'Veg', 
      state: veg, 
      setter: setVeg, 
      icon: '🟢',
      activeClass: 'bg-green-500 text-white shadow-lg',
      inactiveClass: 'bg-white text-gray-700 border-green-500 border'
    },
    { 
      label: 'Non-Veg', 
      state: nonVeg, 
      setter: setNonVeg, 
      icon: '🔴',
      activeClass: 'bg-red-500 text-white',
      inactiveClass: 'bg-white text-gray-700 border-red-500 border'
    },
    { 
      label: 'Rating > 3.5', 
      state: rate, 
      setter: setRate, 
      icon: '⭐',
      activeClass: 'bg-yellow-500 text-white',
      inactiveClass: 'bg-white text-gray-700 border-yellow-500 border'
    },
    { 
      label: '≤ 30 mins', 
      state: time, 
      setter: setTime, 
      icon: '⏱️',
      activeClass: 'bg-blue-500 text-white',
      inactiveClass: 'bg-white text-gray-700 border-blue-500 border'
    },
    { 
      label: '≤ ₹200', 
      state: mrp, 
      setter: setMrp, 
      icon: '💰',
      activeClass: 'bg-green-500 text-white',
      inactiveClass: 'bg-white text-gray-700 border-green-500 border'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        {/* What's on your mind section */}
        <section className="py-12 animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            What's on your mind?
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {randomIndices.map((index) => (
              <div key={index}>
                <ItemCard img={Data[index].img} Name={Data[index].Name} />
              </div>
            ))}
          </div>
        </section>

        {/* Speciality section */}
        <section className="py-12 border-t animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Our Speciality
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {Data.map((data, index) =>
              data.id === 33 || data.id === 34 ? (
                <Card key={index} {...data} />
              ) : null
            )}
          </div>
        </section>

        {/* Filters section */}
        <section className="py-12 border-t animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Online Food Delivery
          </h2>
          
          <div className="flex flex-wrap gap-3 mb-8">
            {filterButtons.map(({ label, state, setter, icon, activeClass, inactiveClass }) => (
              <button
                key={label}
                onClick={() => setter(!state)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200
                  transform hover:-translate-y-0.5 hover:shadow-md
                  ${state ? activeClass : inactiveClass}
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                <span className="text-lg">{icon}</span>
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((data, index) => (
              <div
                key={data.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card {...data} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
