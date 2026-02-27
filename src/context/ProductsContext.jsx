import { createContext, useEffect, useState } from "react";

import { shopService } from "../services/shopService";

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    setError(null);
    try {
      const data = await shopService.getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error("Failed to load products:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ProductsContext.Provider
      value={{ products, loading, error, refresh: loadProducts }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
