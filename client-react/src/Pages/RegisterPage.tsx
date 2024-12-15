import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import wallpaper from "../assets/14.png";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const { POST } = useFetch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newUser = { fullName, email, password, phone, isAdmin };
    const successfullyAddedUser = await POST("users", newUser);
    if (successfullyAddedUser) navigate("/login");
  };

  return (
    <div className=" flex min-h-screen justify-center items-center">
      {/* Image Section */}
      <div className="w-full lg:w-1/2 flex justify-center items-center mt-6 lg:mt-0">
        <img
          src={wallpaper}
          alt="Wallpaper"
          className="max-w-xs lg:max-w-lg h-auto"
        />
      </div>

      {/* Form Section */}
      <div className="bg-white bg-opacity-80 p-8 rounded-3xl shadow-lg w-full max-w-lg flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center text-customBlue-600 mb-6">
          REGISTER
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5 w-full">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-gray-700 font-medium mb-1"
            >
              FULL NAME
            </label>
            <input
              id="fullName"
              type="text"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              EMAIL
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-pink-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-pink-700 transition-transform transform hover:scale-105 mt-5"
          >
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
}
