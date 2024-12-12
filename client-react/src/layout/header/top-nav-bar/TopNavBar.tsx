import React from "react";
import { Link } from "react-router-dom";

export default function TopNavBar() {
  return (
    <div className="fixed top-1/4 right-0 flex flex-col items-center gap-1 bg-gray-100 shadow-md rounded-l-lg p-1">
      {/* Login Button */}
      <Link
        to="/login"
        className="flex items-center justify-center bg-green-500 text-white text-sm font-medium px-3 py-1 rounded-full hover:bg-green-600 transition duration-300"
      >
        Login
      </Link>

      {/* Register Button */}
      <Link
        to="/register"
        className="flex items-center justify-center bg-blue-500 text-white text-sm font-medium px-3 py-1 rounded-full hover:bg-blue-600 transition duration-300"
      >
        Register
      </Link>
    </div>
  );
}
