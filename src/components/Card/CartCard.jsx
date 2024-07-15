import React, { useState } from "react";

function CartCard() {
  const [count, setCount] = useState(1);

  return (
    <div className="">
      <div className="flex flex-row gap-10 items-center font-semibold">
        <div className="">
          <img
            className="w-14 h-14"
            src="https://j6e2i8c9.rocketcdn.me/wp-content/uploads/2020/12/Paneer-butter-masala-recipe-3.jpg"
            alt=""
          />
        </div>
        <h1 className="text-lg">🟢Paneer Butter Masala</h1>
        <div className="flex flex-row items-center gap-3 bg-gray-200 px-2 rounded-lg">
          <button className="font-bold text-2xl">-</button>
          <h1 className="text-green-600 font-bold text-xl">{count}</h1>
          <button className="text-green-600 font-bold text-2xl">+</button>
        </div>
        <div className="">
          <h1 className="text-lg">₹238</h1>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
