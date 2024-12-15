import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { IProduct } from "../types/product.interface";
import ProductModal from "../components/ProductModel";

export default function StorePage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null); // מצב למוצר שנבחר
  const { GET, data } = useFetch();

  useEffect(() => {
    GET("product");
  }, []);

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  const handleCardClick = (product: IProduct) => {
    setSelectedProduct(product); // הגדרת המוצר הנבחר
  };

  const handleCloseModal = () => {
    setSelectedProduct(null); // סגירת המודאל
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Store</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p.name}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleCardClick(p)} // לחיצה על הכרטיס תציג את המודאל
          >
            <img
              src={p.images[0] || "https://via.placeholder.com/150"}
              alt={p.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{p.name}</h2>
              <p className="text-gray-500 text-sm mb-4">{p.description}</p>
              <div className="flex items-center justify-between">
                <span className="inline-block bg-customPink text-white text-xs font-semibold px-2 py-1 rounded">
                  {p.category.name}
                </span>
                <p className="text-green-600 font-bold">
                  ${p.price.toFixed(2)}
                </p>
              </div>
              <button className="mt-4 w-full bg-customGreen text-white py-2 rounded hover:bg-customGreen-600 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* הצגת המודאל אם יש מוצר שנבחר */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseModal} // סגירת המודאל
        />
      )}
    </div>
  );
}
