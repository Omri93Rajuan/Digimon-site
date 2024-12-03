import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import wallpaper from "../assets/11.png";
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
    if (successfullyAddedUser) navigate("/login"); // ניתוב לדף התחברות לאחר הצלחה
  };

  return (
    <div className="bg-gray-100 flex lg:flex-row flex-col-reverse justify-center items-center min-h-screen p-4 lg:p-0">
      {/* <!-- Left: Register Form --> */}
      <div className="lg:p-12 p-6 w-full lg:w-1/2">
        <h1 className="text-3xl font-semibold mb-6">הרשמה</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* <!-- Full Name Input --> */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-gray-700 text-base font-medium"
            >
              שם מלא
            </label>
            <input
              id="fullName"
              type="text"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          {/* <!-- Email Input --> */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 text-base font-medium"
            >
              אימייל
            </label>
            <input
              id="email"
              type="text"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* <!-- Password Input --> */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 text-base font-medium"
            >
              סיסמה
            </label>
            <input
              id="password"
              type="password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* <!-- Phone Input --> */}
          <div>
            <label
              htmlFor="phone"
              className="block text-gray-700 text-base font-medium"
            >
              טלפון
            </label>
            <input
              id="phone"
              type="text"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          {/* <!-- Is Admin Checkbox --> */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isAdmin"
              name="isAdmin"
              className="h-5 w-5 text-blue-500 focus:outline-none"
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            <label
              htmlFor="isAdmin"
              className="text-gray-700 text-base font-medium ml-2"
            >
              האם אתה מנהל?
            </label>
          </div>
          <button
            type="submit"
            className="bg-customGold hover:bg-customGold-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            הרשמה
          </button>
        </form>
      </div>

      {/* <!-- Right: Image --> */}
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <img
          src={wallpaper}
          alt="Placeholder Image"
          className="max-w-md w-3/4 h-auto object-contain"
        />
      </div>
    </div>
  );
}
