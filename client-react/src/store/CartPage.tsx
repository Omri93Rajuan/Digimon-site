import React, { useEffect } from "react";
import { useCart } from "../providers/CartProvider"; // Importing your context
import { useNavigate } from "react-router-dom"; // Import useNavigate to handle navigation
import useFetch from "../hooks/useFetch"; // Assuming useFetch is in hooks folder

export default function CartPage() {
  const { cart, clearCart, setCartCount } = useCart();
  const { POST } = useFetch(); // Use the POST method from useFetch hook
  const navigate = useNavigate(); // Using navigate hook

  useEffect(() => {
    setCartCount(0);
  }, [setCartCount]); // Added proper dependency array

  const handleCheckout = async () => {
    try {
      const orderDetails = {
        products: cart.products.map((item) => ({
          productId: item.product._id,
          quantity: item.quantity,
          price: item.product.price,
        })),
        total: cart.products
          .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
          .toFixed(2),
      };

      // Send the order details to the server
      const order = await POST("orders", orderDetails);
      if (order) {
        // Navigate to the checkout page after successful order submission
        navigate("/checkout");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

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

          {/* Checkout Button */}
          <div className="mt-4">
            <button
              onClick={handleCheckout} // Navigate to the checkout page
              className="w-full bg-blue-500 text-white text-lg font-bold py-2 rounded-full hover:bg-blue-400 transition duration-300"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
