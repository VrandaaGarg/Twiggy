import React from "react";
import logo from "../Images/logo.png";

function Footer() {
  return (
    <div className="">
      <div className=" py-16 px-28 flex flex-row justify-around">
        <div className="flex flex-col ">
          <div className="flex">
            <img src={logo} alt="" className="w-8" />
            <h1 className="text-red-700 text-3xl font-bold">wiggy</h1>
          </div>
          <h1 className="">
            © 2024 Garg <br />
            Private Ltd
          </h1>
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold  text-2xl">Company</h1>
          <h1 className=" font-semibold">About</h1>
          <h1 className=" font-semibold">Team</h1>
          <h1 className="font-semibold">Careers</h1>
          <h1 className=" font-semibold">Twiggy One</h1>
        </div>
        <div className="flex flex-col gap-7">
          <div className="">
            <h1 className="font-bold  text-2xl">Contact us</h1>
            <h1 className=" font-semibold">Help & Support</h1>
            <h1 className=" font-semibold">Partner with us</h1>
            <h1 className="font-semibold">Ride with us</h1>
            <h1 className=" font-semibold">Twiggy One</h1>
          </div>
          <div className="">
            <h1 className="font-bold  text-2xl">Legal</h1>
            <h1 className=" font-semibold">Terms & conditions</h1>
            <h1 className=" font-semibold">Cookie policy</h1>
            <h1 className="font-semibold">Privacy Policy</h1>
            <h1 className=" font-semibold">Investor Relations</h1>
          </div>
        </div>
        <div className="">
          <h1 className="font-bold  text-2xl">We deliver to:</h1>
          <h1 className=" font-semibold">Hapur</h1>
          <h1 className=" font-semibold">Meerut</h1>
          <h1 className="font-semibold">Ghaziabad</h1>
          <h1 className=" font-semibold">Philakhwa</h1>
        </div>
      </div>
    </div>
  );
}

export default Footer;
