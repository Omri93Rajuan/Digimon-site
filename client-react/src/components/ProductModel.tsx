import React from "react";
import { IProduct } from "../types/product.interface";
import { useCart } from "../providers/CartProvider"; // ייבוא הקונטקסט של העגלה

interface ProductModalProps {
  product: IProduct;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart(); // שליפה של הפונקציה להוספה לעגלה

  // פונקציה לחשב את הזמן בצורה יותר טבעית
  const formatDate = (date: Date | undefined) => {
    if (!date) return "N/A";

    const now = new Date();
    const diffInTime = now.getTime() - new Date(date).getTime();
    const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24)); // חישוב מספר הימים בין התאריכים

    // אם זה היה היום
    if (diffInDays === 0) {
      return "Today";
    }

    // אם זה היה אתמול
    if (diffInDays === 1) {
      return "Yesterday";
    }

    // אם זה היה לפני כמה ימים
    if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    }

    // אם זה היה יותר משבוע
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return new Date(date).toLocaleString("en-US", options); // מציג תאריך עם שעה במידה ויותר משבוע
  };

  // פונקציה להוספת המוצר לעגלה
  const handleAddToCart = () => {
    addToCart(product); // הוספה לעגלה
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md relative">
        {/* כפתור לסגירת המודאל */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>

        {/* תמונה של המוצר */}
        <img
          src={product.images[0] || "https://via.placeholder.com/300"}
          alt={product.name}
          className="w-full h-56 object-cover rounded mb-4"
        />

        {/* שם המוצר */}
        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>

        {/* תיאור המוצר */}
        <p className="text-gray-600 mb-4">{product.description}</p>

        {/* מחיר */}
        <p className="text-green-600 font-bold text-lg mb-4">
          ${product.price.toFixed(2)}
        </p>

        {/* קטגוריה */}
        <p className="text-sm text-gray-500 mb-4">
          <strong>Category:</strong> {product.category.name}
        </p>

        {/* מצב המלאי */}
        <p
          className={`text-sm mb-4 ${
            product.stock > 0 ? "text-blue-500" : "text-red-500"
          }`}
        >
          {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
        </p>

        {/* תאריך יצירה ועדכון */}
        <div className="text-sm text-gray-500 mb-4">
          <p>
            <strong>Created At:</strong> {formatDate(product.createdAt)}
          </p>
          <p>
            <strong>Updated At:</strong> {formatDate(product.updatedAt)}
          </p>
        </div>

        {/* כפתור להוספה לעגלה */}

        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0} // כפתור לא פעיל אם המלאי נגמר
          className="mt-4 w-full bg-yellow-500 text-gray-800 text-lg font-bold py-2 rounded-full border-2 border-yellow-600 shadow-md hover:bg-yellow-400 hover:border-yellow-500 hover:scale-105 transition-transform"
        >
          {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
};

export default ProductModal;
