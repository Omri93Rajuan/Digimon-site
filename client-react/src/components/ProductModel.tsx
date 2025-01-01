import React, { useRef, useState } from "react";
import { IProduct } from "../types/product.interface";
import { useCart } from "../providers/CartProvider";
import useFetch from "../hooks/useFetch";

interface ProductModalProps {
  product: IProduct;
  onClose: () => void;
  isEditing: boolean;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  isEditing,
}) => {
  const { addToCart } = useCart();
  const modalRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [editProduct, setEditProduct] = useState<IProduct>(product);
  const [newImageURL, setNewImageURL] = useState("");
  const { POST, PATCH } = useFetch();

  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  const formatDate = (date: Date | undefined) => {
    const now = new Date();
    const diffInTime = now.getTime() - new Date(date || now).getTime();
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

    return new Date(date || now).toLocaleString("en-US", options);
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditProduct({ ...editProduct, [name]: value });
  };

  const handleSave = async () => {
    try {
      if (editProduct._id) {
        await PATCH(`product/${editProduct._id}`, editProduct);
      } else {
        await POST(`product`, editProduct);
      }

      onClose();
    } catch (err) {
      console.error("Failed to save product:", err);
    }
  };

  const handleAddImage = () => {
    if (newImageURL) {
      setEditProduct({
        ...editProduct,
        images: [...editProduct.images, newImageURL],
      });
      setNewImageURL("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setEditProduct({
      ...editProduct,
      images: editProduct.images.filter((_, i) => i !== index),
    });
  };

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
      ref={modalRef}
      onClick={handleClose}
    >
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-3xl relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="relative mb-4 flex flex-col sm:flex-row">
          <div className="relative w-full sm:w-1/2 mb-4 sm:mb-0">
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
          <div className="w-full sm:w-1/2 sm:pl-4">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={editProduct.name}
                  onChange={handleChange}
                  className="w-full mb-2 p-2 border rounded"
                />
                <textarea
                  name="description"
                  value={editProduct.description}
                  onChange={handleChange}
                  className="w-full mb-2 p-2 border rounded"
                />
                <input
                  type="number"
                  name="price"
                  value={editProduct.price}
                  onChange={handleChange}
                  className="w-full mb-2 p-2 border rounded"
                />
                <input
                  type="text"
                  name="category"
                  value={editProduct.category.name}
                  onChange={handleChange}
                  className="w-full mb-2 p-2 border rounded"
                />
                <input
                  type="number"
                  name="stock"
                  value={editProduct.stock}
                  onChange={handleChange}
                  className="w-full mb-2 p-2 border rounded"
                />
                <div className="flex flex-row mb-2 items-center">
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={newImageURL}
                    onChange={(e) => setNewImageURL(e.target.value)}
                    className="flex-grow p-2 border rounded mr-2"
                  />
                  <button
                    onClick={handleAddImage}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg transition duration-200 hover:bg-blue-400"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {editProduct.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Product image ${index + 1}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full p-1 hover:bg-red-400"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
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
                  {product.stock > 0
                    ? `In Stock: ${product.stock}`
                    : "Out of Stock"}
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
                  className={`w-full py-2 px-4 rounded-lg transition duration-200 ${
                    product.stock > 0
                      ? "bg-customBlue-600 hover:bg-customPink-600 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                </button>
              </>
            )}
          </div>
        </div>
        {isEditing && (
          <div className="mt-4">
            <button
              onClick={handleSave}
              className="w-full py-2 px-4 bg-green-500 text-white rounded-lg transition duration-200 hover:bg-green-400"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductModal;
