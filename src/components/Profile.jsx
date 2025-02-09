import { useState, useEffect } from "react";
import { useProfile } from "../context/ProfileContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
  const { user, logout, updateUser } = useProfile();
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    updateUser(editedUser); // Update user in context
    localStorage.setItem("customer", JSON.stringify(editedUser));
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/signup");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md my-14 md:my-28">
      {/* User Details */}
      <div className="mb-6">
        <div className="text-center">
          <FaUserCircle size={94} className="text-gray-500 mx-auto" />
          <p className="text-2xl font-semibold mt-2">
            {isEditing ? (
              <input
                type="text"
                value={editedUser.name}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, name: e.target.value })
                }
                className="border p-1 text-lg"
              />
            ) : (
              user.name
            )}
          </p>
        </div>

        <div className="my-4 mx-7 flex text-center  flex-col gap-2 text-lg">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                value={editedUser.phone}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, phone: e.target.value })
                }
                className="border p-1"
              />
            ) : (
              user.phone
            )}
          </p>
          <p>
            <strong>Address:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                value={editedUser.address.street}
                onChange={(e) =>
                  setEditedUser({
                    ...editedUser,
                    address: { ...editedUser.address, street: e.target.value },
                  })
                }
                className="border p-1"
              />
            ) : (
              `${user.address.street}, ${user.address.city}`
            )}
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={handleLogout}
          className="bg-red-500  text-white p-2 rounded"
        >
          Logout
        </button>
        {isEditing ? (
          <button
            onClick={handleSave}
            className="bg-green-500 text-white p-2 rounded"
          >
            Save Changes
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Edit
          </button>
        )}
      </div>

      {/* Cart Section */}
      <div className="my-16 mx-4 md:mx-10">
        <h3 className="text-xl font-bold mt-6 text-center ">Your Cart</h3>
        {cartItems.length > 0 ? (
          <div className="mt-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="border-b py-2 gap-2 md:gap-8 flex justify-between items-center"
              >
                <div className="flex-shrink-0 md:w-fit sm:w-24 sm:h-24 md:h-24 mb-4 sm:mb-0">
                  <img
                    src={item.img}
                    alt={item.Name}
                    className="h-24 w-24 object-cover rounded-lg"
                  />
                </div>
                <div className="text-left flex-1 flex justify-center flex-col gap-1 md:gap-2">
                  <p className="text-sm font-semibold">{item.Name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {item.mrp}
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                      -
                    </button>
                    <span className="text-base font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-9 md:gap-9 ">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className=" text-gray-400 px-2 ml-2 flex-1 "
                  >
                    ✕
                  </button>
                  <p className="flex-1 flex items-end justify-end">
                    {item.mrp * item.quantity}
                  </p>
                </div>
              </div>
            ))}
            <p className="mt-4 font-bold text-right ">
              Total : {getCartTotal()}
            </p>
          </div>
        ) : (
          <p className="mt-4">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
