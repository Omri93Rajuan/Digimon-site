import React, { createContext, useContext, useReducer } from "react";

// יצירת הקונטקסט
const CartContext = createContext();

// רדוסר לניהול סטייט של עגלת הקניות
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return [...state, action.payload];
    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload);
    case "CLEAR_CART":
      return [];
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// קומפוננטת הספק לקונטקסט
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []); // סטייט התחלתי ריק

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// הוק מותאם אישית לשימוש בקונטקסט
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
