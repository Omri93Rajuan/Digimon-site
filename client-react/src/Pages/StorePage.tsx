import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { IProduct } from "../types/product.interface";

export default function StorePage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { GET, data } = useFetch();

  useEffect(() => {
    GET("product");
  }, []);

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Store</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p.name}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={p.images[0] || "https://via.placeholder.com/150"}
              alt={p.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{p.name}</h2>
              <p className="text-gray-500 text-sm mb-2">{p.description}</p>
              <p className="text-green-600 font-bold">${p.price.toFixed(2)}</p>
              <button className="mt-4 w-full bg-customPink text-white py-2 rounded hover:bg-customPink-600 600 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
