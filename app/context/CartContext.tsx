"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

interface CartContextType {
  cartItems: any[];
  addToCart: (item: any) => void;
  removeFromCart: (item: any) => void;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
});

export interface CartContextProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartContextProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  const addToCart = (item: any) => {
    if (!cartItems.some((cartItem) => cartItem.id === item.id)) {
      setCartItems([...cartItems, item]);
    }
  };

  const removeFromCart = (item: any) => {
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setCartItems(updatedCartItems);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
