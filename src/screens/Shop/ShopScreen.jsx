import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { CartContext } from "../../context/CartContext";
import { LinearGradient } from "expo-linear-gradient";
import { ProductsContext } from "../../context/ProductsContext";
import ShopCard from "../../components/ShopCard";
import { useContext } from "react";
import { useTheme } from "../../context/ThemeProvider";

export default function ShopScreen({ navigation }) {
  const { products, loading } = useContext(ProductsContext);
  const { addToCart, items } = useContext(CartContext);
  const { theme } = useTheme();

  if (loading)
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.accent} />
        <Text style={{ color: theme.textSecondary, marginTop: 10 }}>
          Loading Arcane Artifacts...
        </Text>
      </View>
    );

  const isInCart = (productId) => items.some((item) => item.id === productId);

  return (
    <LinearGradient colors={theme.gradientBackground} style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        contentContainerStyle={{ paddingBottom: 140 }}
        renderItem={({ item }) => (
          <ShopCard
            product={item}
            isInCart={isInCart(item.id)}
            onAddToCart={() => addToCart(item)}
            onDetails={() =>
              navigation.navigate("ProductDetails", { product: item })
            }
          />
        )}
      />

      {/* Floating Cart Button */}
      <TouchableOpacity
        style={[
          styles.cartButton,
          {
            backgroundColor: theme.cardBackground,
            borderColor: theme.accent,
          },
        ]}
        onPress={() => navigation.navigate("CartModal")}
      >
        <Text style={[styles.cartText, { color: theme.text }]}>
          🛒 Cart ({items.length})
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  cartButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    paddingVertical: 16,
    borderRadius: 26,
    borderWidth: 1.5,
    alignItems: "center",
    elevation: 10,
  },

  cartText: {
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 1,
  },
});
