import React, { useEffect } from "react";
import { useCart } from "../providers/CartProvider"; // Importing your context
import { useNavigate } from "react-router-dom"; // Import useNavigate to handle navigation
import useFetch from "../hooks/useFetch"; // Assuming useFetch is in hooks folder

export default function CartPage() {
  const { cart, clearCart, setCartCount, updateQuantity, removeFromCart } =
    useCart(); // Use removeFromCart from context
  const { POST } = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    setCartCount(0);
  }, []);

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

  const handleIncreaseQuantity = (productId: string) => {
    const findProduct = cart.products.find((p) => p.product._id === productId);
    if (findProduct) {
      updateQuantity(productId, findProduct.quantity + 1); // Call updateQuantity from context
    }
  };

  const handleDecreaseQuantity = (productId: string) => {
    const findProduct = cart.products.find((p) => p.product._id === productId);
    if (findProduct && findProduct.quantity > 1) {
      updateQuantity(productId, findProduct.quantity - 1); // Call updateQuantity from context
    }
  };

  const handleRemoveProduct = (productId: string) => {
    removeFromCart(productId); // Call removeFromCart from context
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
                <div className="relative flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={item.product.images[0]} // Assuming product image URL
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    {/* Remove button with X */}
                    <button
                      onClick={() => handleRemoveProduct(item.product._id!)}
                      className="absolute top-0 right-0 text-red-600 text-lg font-bold hover:text-red-900 transition duration-200"
                      style={{
                        background: "rgba(255, 255, 255, 0.7)", // Slight white background to make the X stand out
                        borderRadius: "50%",
                        width: "20px", // Size of the X
                        height: "20px", // Size of the X
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "14px", // Font size of the X
                      }}
                    >
                      X
                    </button>
                  </div>
                  <span className="text-lg font-semibold text-gray-700">
                    {item.product.name}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDecreaseQuantity(item.product._id!)}
                      className="text-gray-600 text-lg font-bold hover:text-gray-900 transition duration-200"
                    >
                      -
                    </button>
                    <span className="text-gray-500">
                      Quantity: {item.quantity}
                    </span>
                    <button
                      onClick={() => handleIncreaseQuantity(item.product._id!)}
                      className="text-gray-600 text-lg font-bold hover:text-gray-900 transition duration-200"
                    >
                      +
                    </button>
                  </div>
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
