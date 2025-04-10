import { useState, useEffect } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";
import { FiMail, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { BsApple, BsFacebook } from "react-icons/bs";
import { FiEye, FiEyeOff } from "react-icons/fi";
import SignUp from "./SignUp";


const Login = () => {
  const navigate = useNavigate();
  const { login } = useProfile();
  const [credentials, setCredentials] = useState({
    emailOrPhone: "",
    password: "",
  });
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(prev => !prev);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("customer"));

    if (
      storedUser &&
      (storedUser.email === credentials.emailOrPhone ||
        storedUser.phone === credentials.emailOrPhone) &&
      storedUser.password === credentials.password
    ) {
      login(storedUser);
      setNotification({
        show: true,
        message: 'Welcome back! Login successful',
        type: 'success'
      });
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      setNotification({
        show: true,
        message: 'Invalid credentials. Please try again.',
        type: 'error'
      });
    }
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

  const socialProviders = [
    { name: 'Google', icon: <FcGoogle className="w-6 h-6" /> },
    { name: 'Apple', icon: <BsApple className="w-6 h-6" /> },
    { name: 'Facebook', icon: <BsFacebook className="w-6 h-6 text-blue-600" /> },
  ];

  return (
    <div className="min-h-screen py-16 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 relative">
      {/* Updated Notification Toast - Now at bottom */}
      {notification.show && (
        <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-md p-4 
                      rounded-xl shadow-lg transform animate-slide-up backdrop-blur-lg
                      ${notification.type === 'success'
            ? 'bg-green-500/90 text-white'
            : 'bg-red-500/90 text-white'}`}>
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl">
              {notification.type === 'success' ? '✅' : '❌'}
            </span>
            <p className="font-medium">{notification.message}</p>
          </div>
        </div>
      )}

      {/* Main Login Card */}
      <div className="w-full max-w-md transform hover:scale-[1.01] transition-all duration-300 mt-10">
        <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-8 rounded-3xl 
                     shadow-xl space-y-8 border border-gray-200 dark:border-gray-700
                     before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/5 
                     before:to-blue-500/5 before:rounded-3xl">
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Welcome Back!
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Sign in to continue your food journey
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email or Phone
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-3 flex items-center 
                              pointer-events-none text-gray-400">
                    <FiMail />
                  </div>
                  <input
                    type="text"
                    name="emailOrPhone"
                    placeholder="Enter your email or phone"
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 pr-4 py-3 rounded-xl 
                             bg-gray-50 dark:bg-gray-700/50 
                             border border-gray-200 dark:border-gray-600 dark:text-gray-300
                             focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark
                             focus:border-transparent outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="mt-1 relative">
                  {/* Left Icon */}
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                    <FiLock />
                  </div>

                  {/* Input with toggle type */}
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 pr-10 py-3 rounded-xl 
                 bg-gray-50 dark:bg-gray-700/50 dark:text-gray-300
                 border border-gray-200 dark:border-gray-600
                 focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark
                 focus:border-transparent outline-none transition-colors"
                  />

                  {/* Toggle Eye Icon */}
                  <div
                    onClick={togglePassword}
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400 hover:text-primary"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="relative w-full py-3 px-4 bg-gradient-to-r from-primary to-primary-dark
                       text-white rounded-xl font-medium overflow-hidden group
                       transform transition-all duration-300
                       hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="absolute inset-0 w-1/2 h-full transition-all
                           bg-gradient-to-r from-white/20 to-transparent
                           group-hover:translate-x-[150%] duration-700"></div>
              Sign in
            </button>
          </form>

          {/* Social Login Section */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-gray-200 dark:border-gray-700 w-full"></div>
            <p className="absolute px-4 text-sm text-gray-500 bg-white dark:bg-gray-800">
              or continue with
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {socialProviders.map(({ name, icon }) => (
              <button
                key={name}
                className="p-3 rounded-xl border border-gray-200 dark:border-gray-700
                         hover:bg-gray-50 dark:hover:bg-gray-700/50
                         transition-all duration-200 hover:scale-105 hover:shadow-md
                         flex items-center justify-center"
              >
                {icon}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4 items-center">
            <span className="text-sm text-gray-500">New to SmartBite?</span>
            <button
              onClick={() => navigate('/signup')}
              className="w-full py-3 px-4 bg-red-500 dark:bg-red-600
                       text-white dark:text-white rounded-xl font-medium
                       hover:bg-red dark:hover:bg-gray-600
                       transform transition-all duration-300
                       hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;