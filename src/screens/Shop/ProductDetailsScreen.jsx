import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { CartContext } from "../../context/CartContext";
import { useContext } from "react";

export default function ProductDetailsScreen({ route, navigation }) {
  const { product } = route.params;
  const { addToCart } = useContext(CartContext);

  return (
    <View style={styles.container}>
      {/* Product Panel */}
      <View style={styles.card}>
        <View style={styles.imageFrame}>
          <Image source={{ uri: product.image }} style={styles.image} />
        </View>

        <Text style={styles.title}>{product.title}</Text>

        <View style={styles.priceBadge}>
          <Text style={styles.price}>€ {product.price}</Text>
        </View>
        {/* Description Panel */}
        <View style={styles.descriptionBox}>
          {/* <Text style={styles.descriptionTitle}>About {product.title}</Text> */}
          <Text style={styles.descriptionText}>
            {product.prod_description || "No mystical description available."}
          </Text>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => addToCart(product)}
        >
          <Text style={styles.primaryText}>⚙️ Add to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate("CartModal")}
        >
          <Text style={styles.secondaryText}>🧭 Go To Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const brass = "#b87333";
const parchment = "#e0c097";
const deepBlue = "#0b132b";
const panel = "#262d50";
const accent = "#431375";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: deepBlue,
    padding: 20,
    alignItems: "center",
  },

  card: {
    width: "100%",
    backgroundColor: panel,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: brass,
    padding: 20,
    alignItems: "center",
    shadowColor: brass,
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 8,
  },

  imageFrame: {
    padding: 10,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: brass,
    backgroundColor: "#1c2541",
    marginBottom: 16,
  },

  image: {
    width: 220,
    height: 220,
    borderRadius: 14,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: parchment,
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: 0.5,
  },

  priceBadge: {
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: brass,
    backgroundColor: "#1c2541",
  },

  price: {
    color: parchment,
    fontSize: 18,
    fontWeight: "700",
  },
  descriptionBox: {
    marginTop: 18,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: brass,
    backgroundColor: "#1c2541",
    width: "100%",
  },

  descriptionTitle: {
    color: parchment,
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 6,
    letterSpacing: 0.5,
  },

  descriptionText: {
    color: "#f0e6ff",
    fontSize: 14,
    lineHeight: 20,
  },
  actions: {
    width: "100%",
    marginTop: 22,
    gap: 12,
  },

  primaryButton: {
    paddingVertical: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: brass,
    backgroundColor: accent,
    alignItems: "center",
  },

  primaryText: {
    color: parchment,
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.5,
  },

  secondaryButton: {
    paddingVertical: 14,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: brass,
    backgroundColor: "#1c2541",
    alignItems: "center",
  },

  secondaryText: {
    color: parchment,
    fontWeight: "600",
    fontSize: 15,
  },
});
