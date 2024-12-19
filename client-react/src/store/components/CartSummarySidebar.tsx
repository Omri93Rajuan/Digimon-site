import React from "react";
import { useCart } from "../../providers/CartProvider";
import { useNavigate } from "react-router-dom"; // הוספת useNavigate

export default function CartSummarySidebar() {
  const { cart, updateQuantity } = useCart(); // שימוש בפונקציה updateQuantity
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/cart");
  };

  const handleIncreaseQuantity = (productId: string) => {
    const findProduct = cart.products.find((p) => p.product._id === productId);

    if (!findProduct) return;

    // קריאה לפונקציה updateQuantity שמגיעה מהקונטקסט
    updateQuantity(productId, findProduct.quantity + 1);
  };

  const handleDecreaseQuantity = (productId: string) => {
    const findProduct = cart.products.find((p) => p.product._id === productId);

    if (!findProduct) return;

    if (findProduct.quantity > 1) {
      // קריאה לפונקציה updateQuantity שמגיעה מהקונטקסט
      updateQuantity(productId, findProduct.quantity - 1);
    } else {
      console.log("Cannot decrease quantity below 1");
    }
  };

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
                <div className="flex-1">
                  <p className="text-sm font-semibold">{item.product.name}</p>
                  <p className="text-sm text-gray-600">x{item.quantity}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDecreaseQuantity(item.product._id!)}
                    className="text-gray-600 text-lg font-bold hover:text-gray-900 transition duration-200"
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleIncreaseQuantity(item.product._id!)}
                    className="text-gray-600 text-lg font-bold hover:text-gray-900 transition duration-200"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-xl font-semibold text-gray-900 mb-4">
            Total: $
            {cart.products
              .reduce(
                (acc, item) => acc + item.product.price * item.quantity,
                0
              )
              .toFixed(2)}
          </div>

          {/* כפתור לתשלום */}
          <button
            onClick={handleCheckout} // קריאה לפונקציה כשנלחץ
            className="w-full bg-blue-500 text-white text-lg font-bold py-2 rounded-full hover:bg-blue-400 transition duration-300"
          >
            Checkout
          </button>
        </div>
      )}
    </>
  );
}
