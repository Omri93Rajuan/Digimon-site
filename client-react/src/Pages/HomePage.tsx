import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { useAuth } from "../hooks/useAuth";
import PageHeader from "../components/PageHeader";

const HomePage = () => {
  const { user } = useAuth(); // קבלת מידע על המשתמש המחובר
  const { GET } = useFetch();

  if (user) {
    return (
      <div className="min-h-screen bg-gray-100">
        <PageHeader title="Dashboard" />
        {user ? (
          <div className="p-8 max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              Welcome, {user.fullName}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg shadow-sm">
                <p className="text-lg font-semibold text-blue-700">Balance</p>
                <p className="text-2xl">${user.balance.toFixed(2)}</p>
              </div>
              <div className="p-6 bg-green-50 border-l-4 border-green-500 rounded-lg shadow-sm">
                <p className="text-lg font-semibold text-green-700">Orders</p>
                <p className="text-2xl">{user.orders.length}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-lg text-center">
            Loading...
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <PageHeader title="Welcome to Our Store" />
      <div className="p-8 max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Discover Our Products</h2>
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="p-4 border rounded-lg shadow-md bg-gray-50">
          <p>Browse our collection of products and find your next purchase!</p>
          {/* ניתן להוסיף כאן הצגה של מוצרים פופולריים או קטגוריות */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
