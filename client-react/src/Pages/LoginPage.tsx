import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import wallpaper from "../assets/15.png"; // התמונה שלך
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { POST } = useFetch();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const UserLogin = { email, password };
    setLoading(true);
    try {
      await login(UserLogin);
      navigate("/");
    } catch (error: any) {
      setError(error?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="bg-white bg-opacity-80 p-8 rounded-3xl shadow-lg w-full max-w-lg flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center text-customBlue-600 mb-6">
          LOGIN
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5 w-full">
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
          {/* Remember Me */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="text-pink-600 focus:ring-0"
            />
            <label
              htmlFor="remember"
              className="ml-2 text-gray-600 font-medium"
            >
              Remember Me
            </label>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-yellow-400 transition-transform transform hover:scale-105 mt-5"
            disabled={loading} // Disable button when loading
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="error-message bg-red-600 text-white p-4 rounded-md mt-4">
            <h1>{error}</h1>
            <button onClick={() => setError(null)} className="ml-4 text-xl">
              X
            </button>
          </div>
        )}
      </div>

      {/* Image Section */}
      <div className="w-full lg:w-1/2 flex justify-center items-center mt-6 lg:mt-0">
        <img
          src={wallpaper}
          alt="Wallpaper"
          className="max-w-xs lg:max-w-lg h-auto"
        />
      </div>
    </div>
  );
}
