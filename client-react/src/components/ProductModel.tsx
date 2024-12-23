import React, { useRef, useState } from "react";
import { IProduct } from "../types/product.interface";
import { useCart } from "../providers/CartProvider";

interface ProductModalProps {
  product: IProduct;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const modalRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return "N/A";

    const now = new Date();
    const diffInTime = now.getTime() - new Date(date).getTime();
    const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;

    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return new Date(date).toLocaleString("en-US", options);
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const showPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
      ref={modalRef}
      onClick={handleClose}
    >
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="relative mb-4">
          <img
            src={
              product.images[currentImageIndex] ||
              "https://via.placeholder.com/300"
            }
            alt={product.name}
            className="w-full h-56 object-cover rounded"
          />
          {product.images.length > 1 && (
            <>
              <button
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-200 text-gray-700 rounded-full px-2 py-1"
                onClick={showPreviousImage}
              >
                &lt;
              </button>
              <button
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-200 text-gray-700 rounded-full px-2 py-1"
                onClick={showNextImage}
              >
                &gt;
              </button>
            </>
          )}
        </div>
        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-green-600 font-bold text-lg mb-4">
          ${product.price.toFixed(2)}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          <strong>Category:</strong> {product.category.name}
        </p>
        <p
          className={`text-sm mb-4 ${
            product.stock > 0 ? "text-blue-500" : "text-red-500"
          }`}
        >
          {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
        </p>
        <div className="text-sm text-gray-500 mb-4">
          <p>
            <strong>Created At:</strong> {formatDate(product.createdAt)}
          </p>
          <p>
            <strong>Updated At:</strong> {formatDate(product.updatedAt)}
          </p>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`mt-2 w-full py-2 px-4 rounded-lg transition duration-200 ${
            product.stock > 0
              ? "bg-customBlue-600 hover:bg-customPink-600 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
};

export default ProductModal;
