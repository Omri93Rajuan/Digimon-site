import React, { useEffect, useState } from "react";
import { useCart } from "../providers/CartProvider";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import PageHeader from "../components/PageHeader";
import ProductModal from "../components/ProductModel";
import { IProduct } from "../types/product.interface";

const CartPage = () => {
  const { cart, clearCart, setCartCount, updateQuantity, removeFromCart } =
    useCart();
  const { POST } = useFetch();
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setCartCount(0);
  }, [setCartCount]);

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

      const order = await POST("orders", orderDetails);
      if (order) {
        navigate("/checkout");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const handleIncreaseQuantity = (productId: string) => {
    const findProduct = cart.products.find((p) => p.product._id === productId);
    if (findProduct) {
      updateQuantity(productId, findProduct.quantity + 1);
    }
  };

  const handleDecreaseQuantity = (productId: string) => {
    const findProduct = cart.products.find((p) => p.product._id === productId);
    if (findProduct && findProduct.quantity > 1) {
      updateQuantity(productId, findProduct.quantity - 1);
    }
  };

  const handleRemoveProduct = (productId: string) => {
    removeFromCart(productId);
  };

  const closeProductModal = () => setSelectedProduct(null);

  const truncateText = (text: string, maxWords: number) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <PageHeader title="Your Cart" />
      {cart.products.length === 0 ? (
        <div className="text-center text-xl text-gray-500">
          Your cart is empty.
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <ul className="space-y-6">
            {cart.products.map((item) => (
              <li
                key={item.product._id}
                className="flex justify-between items-center border-b pb-4"
              >
                <div
                  className="flex items-center space-x-4 cursor-pointer"
                  onClick={() => setSelectedProduct(item.product)}
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <span className="text-lg font-bold text-gray-800">
                    {truncateText(item.product.name, 5)}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDecreaseQuantity(item.product._id!)}
                      className="text-gray-600 text-lg font-semibold border border-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="text-gray-700">{item.quantity}</span>
                    <button
                      onClick={() => handleIncreaseQuantity(item.product._id!)}
                      className="text-gray-600 text-lg font-semibold border border-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-lg font-semibold text-gray-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleRemoveProduct(item.product._id!)}
                    className="text-red-600 text-lg font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={clearCart}
              className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition duration-200"
            >
              Clear Cart
            </button>
            <div className="text-2xl font-semibold text-gray-900">
              Total: $
              {cart.products
                .reduce(
                  (acc, item) => acc + item.product.price * item.quantity,
                  0
                )
                .toFixed(2)}
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={handleCheckout}
              className="w-full bg-customBlue-600 text-white text-lg font-semibold py-3 rounded-full hover:bg-customPink-600 transition duration-200"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeProductModal} />
      )}
    </div>
  );
};

export default CartPage;
