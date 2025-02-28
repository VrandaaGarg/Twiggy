import React from "react";
import useTheme from "../context/ThemeContext";
import { HiSun, HiMoon } from "react-icons/hi";

export default function ThemeBtn() {
  const { themeMode, lightTheme, darkTheme } = useTheme();

  const toggleTheme = () => {
    if (themeMode === "light") {
      darkTheme();
    } else {
      lightTheme();
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-xl bg-gray-100 dark:bg-gray-800
               hover:bg-gray-200 dark:hover:bg-gray-700
               transition-all duration-300 ease-in-out
               group overflow-hidden"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        <HiSun
          className={`w-6 h-6 text-yellow-500 absolute top-0 left-0 
                   transition-all duration-300 transform
                   ${themeMode === 'dark' 
                     ? 'rotate-180 opacity-0' 
                     : 'rotate-0 opacity-100'}`}
        />
        <HiMoon
          className={`w-6 h-6 text-blue-500 absolute top-0 left-0 
                   transition-all duration-300 transform
                   ${themeMode === 'dark' 
                     ? 'rotate-0 opacity-100' 
                     : '-rotate-180 opacity-0'}`}
        />
      </div>
      <div className="absolute inset-0 rounded-xl bg-gray-200 dark:bg-gray-700
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
}
