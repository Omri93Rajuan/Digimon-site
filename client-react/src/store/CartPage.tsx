import React, { useEffect } from "react";
import { useCart } from "../providers/CartProvider"; // Importing your context

export default function CartPage() {
  const { cart, clearCart, setCartCount } = useCart();

  useEffect(() => {
    setCartCount(0);
  }),
    [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Your Cart
      </h1>

      {cart.products.length === 0 ? (
        <div className="text-center text-xl text-gray-500">
          Your cart is empty.
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <ul className="space-y-4">
            {cart.products.map((item) => (
              <li
                key={item.product._id}
                className="flex justify-between items-center border-b pb-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.product.images[0]} // Assuming product image URL
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <span className="text-lg font-semibold text-gray-700">
                    {item.product.name}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-500">
                    Quantity: {item.quantity}
                  </span>
                  <span className="text-xl font-semibold text-gray-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={clearCart}
              className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors"
            >
              Clear Cart
            </button>
            <div className="text-xl font-semibold text-gray-900">
              Total: $
              {cart.products
                .reduce(
                  (acc, item) => acc + item.product.price * item.quantity,
                  0
                )
                .toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
