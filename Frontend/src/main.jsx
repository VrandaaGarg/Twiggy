import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { CartProvider } from "./context/CartContext";
import { ProfileProvider } from "./context/ProfileContext.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Offers from "./components/Offers.jsx";
import Cart from "./components/Cart.jsx";
import User from "./components/User.jsx";
import Cuisine from "./components/Cuisine.jsx";
import SignUp from "./components/SignUp.jsx";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="offer" element={<Offers />} />
      <Route path="cart" element={<Cart />} />
      <Route path="cuisine" element={<Cuisine />} />
      <Route path="user/:userid" element={<User />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="login" element={<Login />} />
      <Route path="profile" element={<Profile />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <ProfileProvider>
        <RouterProvider router={router} />
      </ProfileProvider>
    </CartProvider>
  </React.StrictMode>
);
