import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { CartContext } from "../../context/CartContext";
import { useContext } from "react";
import { useTheme } from "../../context/ThemeProvider";

export default function ProductDetailsScreen({ route, navigation }) {
  const { product } = route.params;
  const { addToCart } = useContext(CartContext);
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View
        style={[
          styles.card,
          { backgroundColor: theme.cardBackground, borderColor: theme.accent },
        ]}
      >
        <View
          style={[
            styles.imageFrame,
            { borderColor: theme.accent, backgroundColor: theme.background },
          ]}
        >
          <Image source={{ uri: product.image }} style={styles.image} />
        </View>

        <Text
          style={[
            styles.title,
            { color: theme.text, fontFamily: theme.fontFamily },
          ]}
        >
          {product.title}
        </Text>

        <View
          style={[
            styles.priceBadge,
            { borderColor: theme.accent, backgroundColor: theme.background },
          ]}
        >
          <Text
            style={[
              styles.price,
              { color: theme.text, fontFamily: theme.fontFamily },
            ]}
          >
            € {product.price}
          </Text>
        </View>

        <View
          style={[
            styles.descriptionBox,
            { borderColor: theme.accent, backgroundColor: theme.background },
          ]}
        >
          <Text
            style={[
              styles.descriptionText,
              { color: theme.text, fontFamily: theme.fontFamily },
            ]}
          >
            {product.prod_description || "No mystical description available."}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[
            styles.primaryButton,
            { backgroundColor: theme.accent, borderColor: theme.accent },
          ]}
          onPress={() => addToCart(product)}
        >
          <Text
            style={[
              styles.primaryText,
              { color: theme.background, fontFamily: theme.fontFamily },
            ]}
          >
            ⚙️ Add to Cart
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.secondaryButton,
            {
              backgroundColor: theme.cardBackground,
              borderColor: theme.accent,
            },
          ]}
          onPress={() => navigation.navigate("CartModal")}
        >
          <Text
            style={[
              styles.secondaryText,
              { color: theme.text, fontFamily: theme.fontFamily },
            ]}
          >
            🧭 Go To Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center" },
  card: {
    width: "100%",
    borderRadius: 22,
    borderWidth: 1.5,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 8,
  },
  imageFrame: {
    padding: 10,
    borderRadius: 20,
    borderWidth: 1.5,
    marginBottom: 16,
  },
  image: { width: 220, height: 220, borderRadius: 14 },
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  priceBadge: {
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 16,
    borderWidth: 1.5,
  },
  price: { fontSize: 18, fontWeight: "700" },
  descriptionBox: {
    marginTop: 18,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1.5,
    width: "100%",
  },
  descriptionText: { fontSize: 14, lineHeight: 20 },
  actions: { width: "100%", marginTop: 22, gap: 12 },
  primaryButton: {
    paddingVertical: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    alignItems: "center",
  },
  primaryText: { fontWeight: "700", fontSize: 16, letterSpacing: 0.5 },
  secondaryButton: {
    paddingVertical: 14,
    borderRadius: 20,
    borderWidth: 1.5,
    alignItems: "center",
  },
  secondaryText: { fontWeight: "600", fontSize: 15 },
});
