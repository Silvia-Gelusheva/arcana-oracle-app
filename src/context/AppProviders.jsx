import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";
import { ProductsProvider } from "./ProductsContext";
import { ReadingsProvider } from "./ReadingsContext";

export function AppProviders({ children }) {
  return (
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <ReadingsProvider>
            {children}
          </ReadingsProvider>
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}
