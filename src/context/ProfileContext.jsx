import { createContext, useContext, useState, useEffect } from "react";
import { useCart } from "./CartContext";

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [user, setUser] = useState(null);
  const { setCartItems, clearCart } = useCart();

  // 🔹 Load user on mount
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const activeUser = storedUsers.find((u) => u.isLoggedIn);

    if (activeUser) {
      setUser(activeUser);
      setCartItems(activeUser.cart || []);
    }
  }, [setCartItems]);

  // 🔹 Login Function
  const login = (userData) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let existingUser = users.find((u) => u.email === userData.email);

    if (existingUser) {
      existingUser = { ...existingUser, isLoggedIn: true };
    } else {
      existingUser = {
        userId: Date.now(), // Unique ID for each user
        ...userData,
        cart: [],
        isLoggedIn: true,
      };
      users.push(existingUser);
    }

    setUser(existingUser);
    setCartItems(existingUser.cart || []);

    const updatedUsers = users.map((u) =>
      u.userId === existingUser.userId ? existingUser : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  // 🔹 Logout Function
  const logout = () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    users = users.map((u) =>
      u.userId === user.userId ? { ...u, isLoggedIn: false, cart: [] } : u
    );

    localStorage.setItem("users", JSON.stringify(users));
    setUser(null);
    clearCart();
  };

  // 🔹 Update User Details
  const updateUser = (updatedUser) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    users = users.map((u) =>
      u.userId === updatedUser.userId ? { ...u, ...updatedUser } : u
    );

    localStorage.setItem("users", JSON.stringify(users));
    setUser(updatedUser);
  };

  return (
    <ProfileContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);
