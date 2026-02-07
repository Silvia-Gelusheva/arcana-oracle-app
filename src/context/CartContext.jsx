import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  function addToCart(product) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);

      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  }

  function increaseQty(id) {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)),
    );
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <CartContext.Provider value={{ items, addToCart, increaseQty, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}
