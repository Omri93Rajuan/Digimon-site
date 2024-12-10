import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";
import wallpaper from "../assets/12.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { POST } = useFetch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const UserLogin = { email, password };
    const findUser = await POST("auth/login", UserLogin);
    navigate("/");
  };

  return (
    <>
      <div className="bg-gray-100 flex lg:flex-row flex-col justify-center items-center min-h-screen">
        {/* <!-- Left: Image --> */}
        <div className="w-1/2 hidden lg:block">
          <img
            src={wallpaper}
            alt="Placeholder Image"
            className="object-contain max-w-[50%] max-h-[20%] mx-auto"
          />
        </div>

        {/* <!-- Right: Login Form --> */}
        <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2 flex-grow">
          <h1 className="text-2xl font-semibold mb-4">התחברות</h1>
          <form onSubmit={handleSubmit}>
            {/* <!-- Username Input --> */}
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-600">
                אימייל
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* <!-- Password Input --> */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600">
                סיסמה
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* <!-- Remember Me Checkbox --> */}
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="text-blue-500"
              />
              <label htmlFor="remember" className="text-gray-600 ml-2">
                זכור אותי{" "}
              </label>
            </div>
            {/* <!-- Forgot Password Link --> */}
            <div className="mb-6 text-blue-500">
              <a href="#" className="hover:underline">
                שכחת את הסיסמה?
              </a>
            </div>
            <button
              type="submit"
              className="bg-customGold hover:bg-customGold-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            >
              כניסה!
            </button>
          </form>
          {/* <!-- Sign up  Link --> */}
          <div className="mt-6 text-blue-500 text-center">
            <Link to={"/register"} className="hover:underline">
              להרשמה לחץ כאן
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
