import React, { useEffect, useState } from "react";
import OfferCard from "../Card/OfferCard";
import Data from "../Data/Data";
import FilterCard from "../Card/FilterCard";

function Offers() {
  const [tenDisc, setTenDisc] = useState(true);
  const [twentyDisc, setTwentyDisc] = useState(false);
  const [thirtyDisc, setThirtyDisc] = useState(false);
  const [fiftyDisc, setFiftyDisc] = useState(false);
  const [seventyFive, setSeventyFive] = useState(false);
  const [filteredItems, setFilteredItems] = useState(Data);

  const OfferFunc = () => {
    let FoodItems = Data;

    if (tenDisc) {
      FoodItems = FoodItems.filter((item) => item.offer >= 10);
    }
    if (twentyDisc) {
      FoodItems = FoodItems.filter((item) => item.offer >= 20);
    }
    if (thirtyDisc) {
      FoodItems = FoodItems.filter((item) => item.offer >= 30);
    }
    if (fiftyDisc) {
      FoodItems = FoodItems.filter((item) => item.offer >= 50);
    }
    if (seventyFive) {
      FoodItems = FoodItems.filter((item) => item.offer >= 75);
    }
    setFilteredItems(FoodItems);
  };

  useEffect(() => {
    OfferFunc();
  }, [tenDisc, twentyDisc, thirtyDisc, fiftyDisc, seventyFive]);

  return (
    <div className="bg-gray-100 pb-20">
      <div className="pt-24 mx-10 border-b pb-16 border-black/25">
        <h1 className="text-3xl text-red-700 font-bold mb-10">
          Deal Of The Day💥
        </h1>
        <div className="flex flex-wrap gap-8">
          {Data.filter((item) => item.offer >= 70).map((item) => (
            <OfferCard
              key={item.id}
              Name={item.Name}
              img={item.img}
              mrp={item.mrp}
              timeForDelivery={item.timeForDelivery}
              rating={item.rating}
              offer={item.offer}
              type={item.type}
            />
          ))}
        </div>
      </div>

      <div className="pt-10 mx-10">
        <h1 className="text-3xl font-bold mb-5 text-red-700">Offers📢</h1>

        <div className="mb-10 flex justify-between">
          <div className="">
            <FilterCard
              variableFunc={setTenDisc}
              Name="ten"
              variable={tenDisc}
              label="≥10% Discount"
            />
          </div>

          <div>
            <FilterCard
              variableFunc={setTwentyDisc}
              Name="twenty"
              variable={twentyDisc}
              label="≥20% Discount"
            />
          </div>

          <div>
            <FilterCard
              variableFunc={setThirtyDisc}
              Name="thirty"
              variable={thirtyDisc}
              label="≥30% Discount"
            />
          </div>

          <div>
            <FilterCard
              variableFunc={setFiftyDisc}
              Name="fifty"
              variable={fiftyDisc}
              label="≥50% Discount"
            />
          </div>

          <div>
            <FilterCard
              variableFunc={setSeventyFive}
              Name="seventy"
              variable={seventyFive}
              label="≥75% Discount"
            />
          </div>
        </div>
      </div>

      <div className="mx-10 ">
        <div className="flex flex-wrap justify-around">
          {filteredItems.map((item) => (
            <OfferCard
              key={item.id}
              Name={item.Name}
              mrp={item.mrp}
              type={item.type}
              img={item.img}
              timeForDelivery={item.timeForDelivery}
              rating={item.rating}
              offer={item.offer}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Offers;
