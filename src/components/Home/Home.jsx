import React, { useState, useEffect } from "react";
import Data from "../Data/Data";
import Card from "../Card/Card";
import ItemCard from "../Card/ItemCard";

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

  return (
    <>
      <div className="">
        <div className="px-16 bg-gray-100">
          <div className="pt-20 pb-7 border-b-2 border-gray-200 mb-10">
            <h1 className="text-3xl font-bold mb-2">What's on your mind?</h1>
            <div className="flex justify-between">
              {randomIndices.map((index) => (
                <div key={index} className="">
                  <ItemCard img={Data[index].img} Name={Data[index].Name} />
                </div>
              ))}
            </div>
          </div>

          <div className="pb-7 border-b-2 border-gray-200 mb-10">
            <h1 className="text-3xl font-bold mb-2">Our Speciality</h1>
            <div className="flex ">
              {Data.map((data, index) =>
                data.id == 33 || data.id == 34 ? (
                  <Card
                    key={index}
                    Name={data.Name}
                    mrp={data.mrp}
                    type={data.type}
                    img={data.img}
                    timeForDelivery={data.timeForDelivery}
                    rating={data.rating}
                  />
                ) : (
                  ""
                )
              )}
            </div>
          </div>

          <div className="">
            <h1 className="text-3xl font-bold mb-9">Online Food Delivery</h1>

            <div className="flex justify-around">
              <div
                className={`bg-white px-5 border border-black rounded-xl ${
                  veg ? "bg-gray-400" : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="veg"
                  id="veg"
                  className="mr-4"
                  checked={veg}
                  onChange={(e) => setVeg(e.target.checked)}
                />
                <label htmlFor="veg">Veg</label>
              </div>

              <div
                className={`bg-white px-5 border border-black rounded-xl ${
                  nonVeg ? "bg-gray-400" : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="nonVeg"
                  id="nonVeg"
                  className="mr-4"
                  checked={nonVeg}
                  onChange={(e) => setNonVeg(e.target.checked)}
                />
                <label htmlFor="nonVeg">Non-Veg</label>
              </div>

              <div
                className={`bg-white px-5 border border-black rounded-xl ${
                  rate ? "bg-gray-400" : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="rating"
                  id="rating"
                  className="mr-4"
                  checked={rate}
                  onChange={(e) => setRate(e.target.checked)}
                />
                <label htmlFor="rating">Rating&gt;3.5</label>
              </div>

              <div
                className={`bg-white px-5 border border-black rounded-xl ${
                  time ? "bg-gray-400" : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="Time"
                  id="Time"
                  className="mr-4"
                  checked={time}
                  onChange={(e) => setTime(e.target.checked)}
                />
                <label htmlFor="Time">Delivery time≤30</label>
              </div>

              <div
                className={`bg-white px-5 border border-black rounded-xl ${
                  mrp ? "bg-gray-400" : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="mrp"
                  id="mrp"
                  className="mr-4"
                  checked={mrp}
                  onChange={(e) => setMrp(e.target.checked)}
                />
                <label htmlFor="mrp">Mrp≤₹200</label>
              </div>
            </div>

            <div className="flex flex-wrap justify-evenly">
              {filteredData.map((data) => (
                <Card
                  key={data.id}
                  Name={data.Name}
                  mrp={data.mrp}
                  timeForDelivery={data.timeForDelivery}
                  type={data.type}
                  rating={data.rating}
                  img={data.img}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
