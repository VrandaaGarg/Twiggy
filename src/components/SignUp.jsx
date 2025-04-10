import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";
import { FiUser, FiPhone, FiMail, FiLock, FiMapPin, FiHome } from "react-icons/fi";
import { FiEye, FiEyeOff } from "react-icons/fi";

const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useProfile();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };


  const [user, setUser] = useState({
    name: "",
    phone: "",
    image: "",
    address: { houseNo: "", street: "", city: "", pincode: "", state: "" },
    email: "",
    password: "",
  });

  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["houseNo", "street", "city", "pincode", "state"].includes(name)) {
      setUser((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    localStorage.setItem("customer", JSON.stringify(user));
    login(user);
    setNotification({
      show: true,
      message: 'Account created successfully! Welcome to SmartBite',
      type: 'success'
    });
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  // Auto hide notification
  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ ...notification, show: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 py-14 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 relative">
      {/* Updated Notification Toast - Now at bottom */}
      {notification.show && (
        <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-md p-4 
                      rounded-xl shadow-lg transform animate-slide-up backdrop-blur-lg
                      ${notification.type === 'success'
            ? 'bg-green-500/90 text-white'
            : 'bg-red-500/90 text-white'}`}>
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl">✅</span>
            <p className="font-medium">{notification.message}</p>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto mt-10"> {/* Added mt-10 here */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Join SmartBite
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Create your account and start ordering delicious food
            </p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-6 md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <FiUser className="text-primary" /> Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    icon={<FiUser />}
                    name="name"
                    placeholder="Full Name"
                    onChange={handleChange}


                  />
                  <InputField
                    icon={<FiPhone />}
                    name="phone"
                    placeholder="Phone Number"
                    onChange={handleChange}
                  />
                  <InputField
                    icon={<FiMail />}
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                  />
                  <InputField
                    icon={<FiLock />}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={handleChange}
                    rightIcon={
                      <div onClick={togglePassword} className="cursor-pointer">
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </div>
                    }
                  />

                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-6 md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <FiMapPin className="text-primary" /> Delivery Address
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    icon={<FiHome />}
                    name="houseNo"
                    placeholder="House No."
                    onChange={handleChange}
                  />
                  <InputField
                    icon={<FiMapPin />}
                    name="street"
                    placeholder="Street"
                    onChange={handleChange}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InputField
                    icon={<FiMapPin />}
                    name="city"
                    placeholder="City"
                    onChange={handleChange}
                  />
                  <InputField
                    icon={<FiMapPin />}
                    name="pincode"
                    placeholder="Pincode"
                    onChange={handleChange}
                  />
                  <InputField
                    icon={<FiMapPin />}
                    name="state"
                    placeholder="State"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-primary to-primary-dark
                       text-white rounded-xl font-medium text-lg
                       transform transition-all duration-300
                       hover:shadow-lg hover:scale-[1.01] active:scale-[0.98]"
            >
              Create Account
            </button>

            <p className="text-center text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="font-medium text-primary hover:text-primary-dark
                         transition-colors underline-offset-4 hover:underline"
              >
                Sign in
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

// Update InputField component with modern styling
const InputField = ({ icon, rightIcon, name, type = "text", placeholder, onChange }) => (
  <div className="relative group">
    {/* Left Icon */}
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none 
                    text-gray-400 group-focus-within:text-primary transition-colors">
      {icon}
    </div>

    {/* Input */}
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      required
      className="block w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-gray-700/50
                 border border-gray-200 dark:border-gray-600 rounded-xl dark:text-gray-300
                 focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark
                 focus:border-transparent outline-none transition-all"
    />

    {/* Right Icon */}
    {rightIcon && (
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer 
                      text-gray-400 hover:text-primary transition-colors">
        {rightIcon}
      </div>
    )}
  </div>
);


export default SignUp;
