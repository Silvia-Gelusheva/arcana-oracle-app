import { createContext, useMemo, useState } from "react";

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
      prev.map((i) =>
        i.id === id ? { ...i, qty: i.qty < 5 ? i.qty + 1 : 5 } : i,
      ),
    );
  }

  function decreaseQty(id) {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, qty: i.qty > 0 ? i.qty - 1 : 0 } : i,
      ),
    );
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }
  const totalPrice = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
