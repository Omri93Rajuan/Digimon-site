import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { IProduct } from "../types/product.interface";
import ProductModal from "../components/ProductModel";
import { useCart } from "../providers/CartProvider";

export default function StorePage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const { GET, data, error } = useFetch();
  const { addToCart } = useCart();

  // Fetch products on component mount
  useEffect(() => {
    GET("product");
  }, [GET]);

  // Update products state when data changes
  useEffect(() => {
    if (data) {
      setProducts([...data].reverse());
    }
  }, [data]);

  // Handle opening product modal
  const openProductModal = (product: IProduct) => {
    setSelectedProduct(product);
  };

  // Handle closing product modal
  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  // Handle adding product to cart
  const handleAddToCart = (product: IProduct, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering modal click
    addToCart(product);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-customBlue-600 drop-shadow-lg">
        Welcome to the Store
      </h1>

      {error && (
        <p className="text-red-600 text-center">
          Failed to load products. Please try again later.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            onClick={() => openProductModal(product)}
            className="relative bg-gradient-to-br from-white to-gray-100 border-2 border-yellow-500 rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer flex flex-col h-[420px]"
          >
            <img
              src={product.images[0] || "https://via.placeholder.com/150"}
              alt={product.name}
              className="w-full h-48 object-cover border-b-2 border-yellow-500"
            />

            <div className="p-4 flex-grow flex flex-col justify-between">
              <h2 className="text-lg font-semibold text-customBlue-700 mb-2">
                {product.name}
              </h2>
              <p className="text-gray-600 text-sm line-clamp-2 h-12 mb-4">
                {product.description}
              </p>

              <div className="flex items-center justify-between mt-auto">
                <span className="inline-block bg-customPink text-white text-xs font-semibold px-2 py-1 rounded shadow">
                  {product.category.name}
                </span>
                <p className="text-green-600 font-bold text-lg">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              <button
                onClick={(e) => handleAddToCart(product, e)}
                className="mt-4 w-full bg-yellow-500 text-gray-800 text-lg font-bold py-2 rounded-full border-2 border-yellow-600 shadow-md hover:bg-yellow-400 hover:border-yellow-500 hover:scale-105 transition-transform"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeProductModal} />
      )}
    </div>
  );
}
