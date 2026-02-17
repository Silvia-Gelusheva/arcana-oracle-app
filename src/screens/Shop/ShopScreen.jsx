import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { CartContext } from "../../context/CartContext";
import { ProductsContext } from "../../context/ProductsContext";
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

  const isInCart = (productId) => items.some((i) => i.id === productId);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={products}
        keyExtractor={(i) => i.id.toString()}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.cardBackground,
                borderColor: theme.border,
              },
            ]}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="cover"
            />

            <View style={styles.info}>
              <Text style={[styles.title, { color: theme.text }]}>
                {item.title}
              </Text>
              <Text style={[styles.price, { color: theme.textSecondary }]}>
                € {item.price}
              </Text>

              <View style={styles.buttons}>
                <TouchableOpacity
                  style={[
                    styles.buttonPrimary,
                    {
                      backgroundColor: isInCart(item.id)
                        ? theme.accent
                        : theme.buttonPrimary,
                      borderColor: theme.border,
                    },
                  ]}
                  onPress={() => addToCart(item)}
                >
                  <Text style={[styles.buttonText, { color: theme.text }]}>
                    {isInCart(item.id) ? "✅ Added" : "⚙️ Add"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.buttonSecondary,
                    {
                      backgroundColor: theme.buttonSecondary,
                      borderColor: theme.border,
                    },
                  ]}
                  onPress={() =>
                    navigation.navigate("ProductDetails", { product: item })
                  }
                >
                  <Text style={[styles.buttonText, { color: theme.text }]}>
                    🔎 Details
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        style={[
          styles.goToCart,
          { backgroundColor: theme.cardBackground, borderColor: theme.border },
        ]}
        onPress={() => navigation.navigate("CartModal")}
      >
        <Text style={[styles.goToCartText, { color: theme.text }]}>
          ⛓ Cart ({items.length})
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  card: {
    flexDirection: "row",
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 12,
    marginBottom: 16,
    alignItems: "center",
  },

  image: {
    width: 100,
    height: 120,
    borderRadius: 12,
    marginRight: 12,
  },

  info: {
    flex: 1,
    justifyContent: "space-between",
  },

  title: { fontSize: 16, fontWeight: "700" },
  price: { fontSize: 14, fontWeight: "600", marginBottom: 8 },

  buttons: { flexDirection: "row", justifyContent: "flex-end", gap: 8 },

  buttonPrimary: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonSecondary: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: "center",
  },

  buttonText: { fontWeight: "700", fontSize: 12 },

  goToCart: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    paddingVertical: 14,
    borderRadius: 20,
    borderWidth: 1.5,
    alignItems: "center",
  },

  goToCartText: { fontWeight: "700", fontSize: 16, letterSpacing: 1 },
});
