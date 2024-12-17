// src/components/NavBar.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../../providers/CartProvider"; // ייבוא הקונטקסט של העגלה
import Logo from "../logo/Logo"; // ייבוא הלוגו שלך

export default function NavBar() {
  const { cartCount } = useCart(); // שליפה של מספר המוצרים בעגלה

  return (
    <nav className="bg-gradient-to-r from-yellow-200 via-customBlue-600 to-yellow-200 border-b-4 border-yellow-500 shadow-xl">
      <div className="flex items-center justify-between px-6 py-3">
        {/* הלוגו משמאל */}
        <div className="flex-shrink-0 scale-110 hover:scale-125 transition-all duration-300 transform hover:rotate-12">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        {/* כותרות במרכז */}
        <div className="flex gap-8 items-center text-xl font-semibold text-white drop-shadow-md">
          <Link
            to="/"
            className="hover:text-yellow-400 transition-all duration-300 transform hover:scale-110 hover:translate-x-2"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-yellow-400 transition-all duration-300 transform hover:scale-110 hover:translate-x-2"
          >
            About
          </Link>
          <Link
            to="/store"
            className="hover:text-yellow-400 transition-all duration-300 transform hover:scale-110 hover:translate-x-2"
          >
            Store
          </Link>
          <Link
            to="/cart"
            className="hover:text-yellow-400 transition-all duration-300 transform hover:scale-110 hover:translate-x-2"
          >
            Cart{" "}
            {cartCount > 0 && (
              <span className="ml-2 bg-red-600 text-white px-2 py-1 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* כפתורים מימין */}
        <div className="flex gap-6">
          <Link
            to="/login"
            className="bg-yellow-500 text-gray-800 px-5 py-2 rounded-full text-md font-semibold hover:bg-yellow-400 hover:scale-105 transition-all duration-300 transform hover:rotate-3"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-pink-600 text-white px-5 py-2 rounded-full text-md font-semibold hover:bg-pink-500 hover:scale-105 transition-all duration-300 transform hover:rotate-3"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
