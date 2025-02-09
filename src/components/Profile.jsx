import { useState, useEffect } from "react";
import { useProfile } from "../context/ProfileContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FiPhone, FiMapPin, FiMail, FiEdit2 } from "react-icons/fi";

const Profile = () => {
  const { user, logout, updateUser } = useProfile();
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    // Redirect to login if no user
    if (!user) {
      navigate('/login');
      return;
    }
    setEditedUser(user);
  }, [user, navigate]);

  // Return null or loading state if user is not available
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 
                    flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Please login to view your profile
          </h2>
          <button
            onClick={() => navigate('/login')}
            className="mt-4 px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

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

  // Function to generate initials avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Function to generate consistent background color based on name
  const getAvatarColor = (name) => {
    const colors = [
      'from-pink-500 to-rose-500',
      'from-purple-500 to-indigo-500',
      'from-blue-500 to-cyan-500',
      'from-green-500 to-emerald-500',
      'from-yellow-500 to-orange-500'
    ];
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20 pb-24 px-4">
      {/* Added pb-24 above for bottom padding */}
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Card */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden">
          {/* Updated Profile Header with Background */}
          <div className="relative h-48 bg-gradient-to-r from-primary/20 to-blue-500/20 dark:from-primary/10 dark:to-blue-500/10">
            {/* Moved Avatar inside header div with adjusted positioning */}
            <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2">
              <div className={`w-32 h-32 rounded-full bg-gradient-to-r ${getAvatarColor(user?.name || 'User')}
                           flex items-center justify-center text-4xl font-bold text-white
                           border-4 border-white dark:border-gray-800 shadow-lg`}>
                {getInitials(user?.name || 'User')}
              </div>
            </div>
          </div>
          
          <div className="px-6 pt-20 pb-6"> {/* Added top padding to accommodate avatar */}
            {/* Profile Info */}
            <div className="text-center">
              {isEditing ? (
                <input
                  type="text"
                  value={editedUser.name}
                  onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                  className="text-3xl font-bold text-center bg-transparent border-b-2 
                           border-primary focus:outline-none mx-auto"
                />
              ) : (
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {user.name}
                </h2>
              )}
              
              {/* Contact Details */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <InfoCard icon={<FiMail />} label="Email" value={user.email} />
                <InfoCard 
                  icon={<FiPhone />} 
                  label="Phone" 
                  value={user.phone}
                  isEditing={isEditing}
                  onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                />
                <InfoCard 
                  icon={<FiMapPin />} 
                  label="Address" 
                  value={`${user.address.street}, ${user.address.city}`}
                  isEditing={isEditing}
                  onChange={(e) => setEditedUser({
                    ...editedUser,
                    address: { ...editedUser.address, street: e.target.value }
                  })}
                />
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex justify-center gap-4">
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 rounded-xl text-white bg-gradient-to-r from-red-500 to-red-600
                           hover:shadow-lg transform transition-all duration-200 hover:scale-[1.02]"
                >
                  Logout
                </button>
                <button
                  onClick={isEditing ? handleSave : handleEdit}
                  className={`px-6 py-2 rounded-xl text-white flex items-center gap-2
                           ${isEditing 
                             ? 'bg-gradient-to-r from-green-500 to-green-600'
                             : 'bg-gradient-to-r from-primary to-primary-dark'
                           }
                           hover:shadow-lg transform transition-all duration-200 hover:scale-[1.02]`}
                >
                  <FiEdit2 />
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cart Section with updated UI */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 mb-12">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 
                      bg-clip-text text-transparent mb-6 flex items-center gap-2">
            <span>🛒</span> Your Cart
          </h3>
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
            <p className="mt-4 text-black dark:text-white">Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// New InfoCard component
const InfoCard = ({ icon, label, value, isEditing, onChange }) => (
  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 flex flex-col items-center gap-2">
    <div className="text-primary dark:text-primary-light">{icon}</div>
    <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
    {isEditing && onChange ? (
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="text-center bg-transparent border-b border-gray-300 dark:border-gray-600
                 focus:outline-none focus:border-primary"
      />
    ) : (
      <span className="font-medium text-gray-900 dark:text-white">{value}</span>
    )}
  </div>
);

export default Profile;
