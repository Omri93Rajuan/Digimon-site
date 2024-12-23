import { createContext, useContext, useState, useEffect } from "react";
import { IProduct } from "../types/product.interface";

interface CartContextType {
  cart: { products: { product: IProduct; quantity: number }[] };
  addToCart: (product: IProduct) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  setCartCount: (number: number) => void;
  cartCount: number;
  updateQuantity: (id: string, quantity: number) => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<{
    products: { product: IProduct; quantity: number }[];
  }>({ products: [] });
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCart(parsedCart);
      setCartCount(
        parsedCart.products.reduce(
          (acc: number, item: any) => acc + item.quantity,
          0
        )
      );
    }
  }, []);

  const addToCart = (product: IProduct) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.products.findIndex(
        (item) => item.product._id === product._id
      );
      if (existingProductIndex !== -1) {
        const updatedProducts = [...prevCart.products];
        updatedProducts[existingProductIndex].quantity += 1;
        setCartCount((prevCount) => prevCount + 1);
        return { products: updatedProducts };
      }
      setCartCount((prevCount) => prevCount + 1);
      return { products: [...prevCart.products, { product, quantity: 1 }] };
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => {
      const updatedProducts = prevCart.products.filter(
        (item) => item.product._id !== id
      );
      setCartCount(
        updatedProducts.reduce((acc, item) => acc + item.quantity, 0)
      );
      return { products: updatedProducts };
    });
  };

  const clearCart = () => {
    setCart({ products: [] });
    setCartCount(0);
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart((prevCart) => {
      const updatedProducts = prevCart.products.map((item) =>
        item.product._id === id ? { ...item, quantity } : item
      );
      setCartCount(
        updatedProducts.reduce((acc, item) => acc + item.quantity, 0)
      );
      return { products: updatedProducts };
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        setCartCount,
        cartCount,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
