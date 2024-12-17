import React from "react";
import { useCart } from "../../providers/CartProvider";

export default function CartSummarySidebar() {
  const { cart } = useCart();

  return (
    <>
      {cart.products.length > 0 && (
        <div className="fixed right-0 top-1/4 bg-white shadow-lg rounded-lg p-4 w-64">
          <h3 className="text-xl font-bold mb-4">Cart Summary</h3>
          <div className="space-y-4">
            {cart.products.map((item) => (
              <div
                key={item.product._id}
                className="flex items-center space-x-4"
              >
                <img
                  src={
                    item.product.images[0] || "https://via.placeholder.com/50"
                  }
                  alt={item.product.name}
                  className="w-12 h-12 object-cover"
                />
                <div>
                  <p className="text-sm font-semibold">{item.product.name}</p>
                  <p className="text-sm text-gray-600">x{item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
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
      )}
    </>
  );
}
