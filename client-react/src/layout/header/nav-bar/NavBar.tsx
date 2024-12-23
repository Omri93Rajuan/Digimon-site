// src/components/NavBar.tsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../../providers/CartProvider";
import { useAuth } from "../../../hooks/useAuth";
import Logo from "../logo/Logo";
import Link_nav_bar from "../../../components/Link_nav_bar";

export default function NavBar() {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <nav className="bg-gray-100 border-b border-gray-300 shadow-sm">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex-shrink-0">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className="flex-1 flex justify-center space-x-8">
          <Link_nav_bar to="/home" innerText="Home" />
          <Link_nav_bar to="/about" innerText="About" />
          <Link_nav_bar to="/store" innerText="Store" />
          <div className="relative">
            <Link_nav_bar to="/cart" innerText="Cart" />
            {cartCount > 0 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 mb-2 bg-red-600 text-white text-sm font-semibold rounded-full w-6 h-6 flex items-center justify-center">
                {cartCount}
              </div>
            )}
          </div>
        </div>
        <div className="relative flex items-center gap-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
