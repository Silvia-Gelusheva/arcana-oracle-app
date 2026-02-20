import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useContext, useState } from "react";

import { CartContext } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeProvider";

export default function ProductDetailsScreen({ route, navigation }) {
  const { product } = route.params;
  const { addToCart, items } = useContext(CartContext);
  const { theme } = useTheme();
  const [isAdded, setIsAdded] = useState(false);
  const isInCart = (productId) => items.some((item) => item.id === productId);
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* TOP CARD (Image + Title + Price) */}
      <View
        style={[
          styles.topCard,
          {
            backgroundColor: theme.cardBackground,
            borderColor: theme.accent,
          },
        ]}
      >
        <Image source={{ uri: product.image }} style={styles.image} />

        <Text style={[styles.title, { color: theme.text }]}>
          {product.title}
        </Text>

        <Text style={[styles.price, { color: theme.accent }]}>
          € {product.price}
        </Text>
      </View>

      {/*  DESCRIPTION CARD */}
      <View
        style={[
          styles.descriptionCard,
          {
            backgroundColor: theme.cardBackground,
            borderColor: theme.accent,
          },
        ]}
      >
        <Text style={[styles.descriptionText, { color: theme.text }]}>
          {product.prod_description || "No mystical description available."}
        </Text>
      </View>

      {/*  ACTION BUTTONS */}
      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={[
            styles.addButton,
            {
              backgroundColor: isAdded ? "#4CAF50" : theme.accent,
              opacity: isAdded ? 0.85 : 1,
            },
          ]}
          onPress={() => {
            if (!isAdded) {
              addToCart(product);
              setIsAdded(true);
            }
          }}
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonText, { color: theme.background }]}>
            {isInCart(product.id) ? "✓ Added" : "Add to Cart"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.cartButton,
            {
              borderColor: theme.accent,
              backgroundColor: theme.cardBackground,
            },
          ]}
          onPress={() => navigation.navigate("CartModal")}
        >
          <Text style={[styles.buttonText, { color: theme.text }]}>
            Go to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },

  /*  TOP CARD */
  topCard: {
    borderRadius: 20,
    borderWidth: 1.5,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },

  image: {
    width: 240,
    height: 240,
    borderRadius: 16,
    marginBottom: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
  },

  price: {
    fontSize: 18,
    fontWeight: "700",
  },

  /*  DESCRIPTION CARD */
  descriptionCard: {
    borderRadius: 20,
    borderWidth: 1.5,
    padding: 18,
  },

  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
  },

  /*  BUTTONS */
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  addButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
  },

  cartButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 18,
    borderWidth: 1.5,
    alignItems: "center",
  },

  buttonText: {
    fontSize: 15,
    fontWeight: "700",
  },
});
