import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  // 🔹 Load user and cart on mount
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const activeUser = storedUsers.find((u) => u.isLoggedIn);

    if (activeUser) {
      setUser(activeUser);
      setCartItems(activeUser.cart || []);
    }
  }, []);

  // 🔹 Store cart updates in localStorage whenever cartItems change
  useEffect(() => {
    if (!user) return;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    users = users.map((u) =>
      u.userId === user.userId ? { ...u, cart: cartItems } : u
    );

    localStorage.setItem("users", JSON.stringify(users));
  }, [cartItems]); // 🔹 Now depends only on cartItems, ensuring correct updates

  // 🔹 Add Item to Cart
  const addToCart = (item) => {
    if (!user) {
      alert("You need to log in first!");
      window.location.href = "/login"; // Redirect to login page
      return;
    }

    setCartItems((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      let updatedCart;

      if (existingItem) {
        updatedCart = prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        updatedCart = [...prevCart, { ...item, quantity: 1 }];
      }

      // 🔹 Update `localStorage` after state update
      updateUserCart(updatedCart);
      return updatedCart;
    });
  };

  // 🔹 Remove Item from Cart
  const removeFromCart = (itemId) => {
    setCartItems((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== itemId);
      updateUserCart(updatedCart);
      return updatedCart;
    });
  };

  // 🔹 Update Quantity
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }

    console.log("Before updating:", cartItems);

    setCartItems((prevCart) => {
      console.log("Previous cart state:", prevCart);

      const updatedCart = prevCart.map((i) =>
        i.id === itemId ? { ...i, quantity: newQuantity } : i
      );

      console.log("Updated Cart State:", updatedCart);
      updateUserCart(updatedCart); // Assuming this updates user data
      return updatedCart;
    });
  };

  // 🔹 Get Cart Total Price
  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.mrp * item.quantity,
      0
    );
  };

  // 🔹 Clear Cart (Used on Logout)
  const clearCart = () => {
    setCartItems([]);
    updateUserCart([]);
  };

  // 🔹 Utility function to update user's cart in localStorage
  const updateUserCart = (updatedCart) => {
    console.log("Updating localStorage cart:", updatedCart);
    let users = JSON.parse(localStorage.getItem("users")) || [];

    users = users.map((u) =>
      u.userId === user?.userId ? { ...u, cart: updatedCart } : u
    );

    localStorage.setItem("users", JSON.stringify(users));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        clearCart,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
