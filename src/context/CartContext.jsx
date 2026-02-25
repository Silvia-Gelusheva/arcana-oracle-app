import { createContext, useContext, useEffect, useMemo, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./AuthContext";
import { cartService } from "../services/cartService";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCart() {
      setLoading(true);

      if (user) {
        const guest = await AsyncStorage.getItem("guestCart");
        const guestItems = guest ? JSON.parse(guest) : [];

        const dbCart = await cartService.getCartByUserId(user.uid);
        const dbItems = dbCart?.items || [];

        let merged = [...dbItems];

        guestItems.forEach((gItem) => {
          const existing = merged.find((i) => i.id === gItem.id);
          if (existing) {
            existing.qty = Math.min(existing.qty + gItem.qty, 5);
          } else {
            merged.push(gItem);
          }
        });

        if (guestItems.length > 0) {
          await cartService.updateCart({ ...dbCart, items: merged });
          await AsyncStorage.removeItem("guestCart");
        }

        setItems(merged);
      } else {
        // Guest
        const guest = await AsyncStorage.getItem("guestCart");
        setItems(guest ? JSON.parse(guest) : []);
      }

      setLoading(false);
    }

    loadCart();
  }, [user]);

  async function saveCart(updatedItems) {
    setItems(updatedItems);

    if (user) {
      const dbCart = await cartService.getCartByUserId(user.uid);
      await cartService.updateCart({ ...dbCart, items: updatedItems });
    } else {
      await AsyncStorage.setItem("guestCart", JSON.stringify(updatedItems));
    }
  }

  const addToCart = async (product) => {
    const exists = items.find((i) => i.id === product.id);

    if (exists) {
      return "exists";
    }

    const updated = [...items, { ...product, qty: 1 }];

    setItems(updated);

    try {
      if (user) {
        await cartService.updateCart({
          userId: user.uid,
          items: updated,
        });
      } else {
        await AsyncStorage.setItem("guestCart", JSON.stringify(updated));
      }

      return "added";
    } catch (err) {
      console.error("Cart update failed");
      setItems(items); // rollback
      return "error";
    }
  };

  const increaseQty = (id) => {
    const updated = items.map((i) =>
      i.id === id ? { ...i, qty: Math.min(i.qty + 1, 5) } : i,
    );
    saveCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = items
      .map((i) => (i.id === id ? { ...i, qty: Math.max(i.qty - 1, 0) } : i))
      .filter((i) => i.qty > 0);

    saveCart(updated);
  };

  const removeItem = (id) => {
    const updated = items.filter((i) => i.id !== id);
    saveCart(updated);
  };

  const totalPrice = useMemo(() => {
    return items.reduce((sum, i) => sum + i.price * i.qty, 0);
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
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
