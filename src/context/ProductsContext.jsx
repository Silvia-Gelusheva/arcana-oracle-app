import { createContext, useEffect, useState } from "react";

import { shopService } from "../services/shopService";

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await shopService.getAllProducts();
      setProducts(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ProductsContext.Provider value={{ products, loading }}>
      {children}
    </ProductsContext.Provider>
  );
}
