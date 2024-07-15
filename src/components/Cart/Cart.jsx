import React from "react";
import CartCard from "../Card/CartCard";

function Cart() {
  return (
    <div className="bg-gray-200 pt-28 flex justify-center pb-14">
      <div className="px-8 max-w-max mt-4 bg-white p-5">
        <CartCard />
      </div>
    </div>
  );
}

export default Cart;
