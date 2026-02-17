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

export default function ShopScreen({ navigation }) {
  const { products, loading } = useContext(ProductsContext);
  const { addToCart, items } = useContext(CartContext);

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={styles.brass.color} />
        <Text style={styles.loadingText}>Loading Arcane Artifacts...</Text>
      </View>
    );

  const isInCart = (productId) => items.some((i) => i.id === productId);

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(i) => i.id.toString()}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>€ {item.price}</Text>

              <View style={styles.buttons}>
                <TouchableOpacity
                  style={[
                    styles.buttonPrimary,
                    isInCart(item.id) && { backgroundColor: "#431375" },
                  ]}
                  onPress={() => addToCart(item)}
                >
                  <Text style={styles.buttonText}>
                    {isInCart(item.id) ? "✅ Added" : "⚙️ Add"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonSecondary}
                  onPress={() =>
                    navigation.navigate("ProductDetails", { product: item })
                  }
                >
                  <Text style={styles.buttonText}>🔎 Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      {/* Go to Cart Button */}
      <TouchableOpacity
        style={styles.goToCart}
        onPress={() => navigation.navigate("CartModal")}
      >
        <Text style={styles.goToCartText}>⛓ Cart ({items.length})</Text>
      </TouchableOpacity>
    </View>
  );
}

const brass = "#b87333";
const parchment = "#e0c097";
const deepBlue = "#0b132b";
const panel = "#262d50";

const styles = StyleSheet.create({
  brass: { color: brass },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: deepBlue,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: deepBlue,
  },

  loadingText: {
    marginTop: 10,
    color: parchment,
    fontWeight: "600",
    fontSize: 16,
  },

  card: {
    flexDirection: "row",
    backgroundColor: panel,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: brass,
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

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: parchment,
    marginBottom: 4,
  },

  price: {
    fontSize: 14,
    fontWeight: "600",
    color: brass,
    marginBottom: 8,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },

  buttonPrimary: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: brass,
    alignItems: "center",
  },

  buttonSecondary: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: brass,
    backgroundColor: deepBlue,
    alignItems: "center",
  },

  buttonText: {
    color: parchment,
    fontWeight: "700",
    fontSize: 12,
  },

  // Go to Cart
  goToCart: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    paddingVertical: 14,
    backgroundColor: panel,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: brass,
    alignItems: "center",
  },

  goToCartText: {
    color: parchment,
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 1,
  },
});
