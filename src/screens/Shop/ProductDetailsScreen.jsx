import * as Sharing from "expo-sharing";

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { useContext, useRef, useState } from "react";

import { CartContext } from "../../context/CartContext";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import ViewShot from "react-native-view-shot";
import { useTheme } from "../../context/ThemeProvider";

export default function ProductDetailsScreen({ route, navigation }) {
  const { product } = route.params;
  const { addToCart, items } = useContext(CartContext);
  const { theme } = useTheme();

  const viewShotRef = useRef();

  const isInCart = (productId) => items.some((item) => item.id === productId);

  const handleAddToCart = async () => {
    const result = await addToCart(product);

    if (result === "added") {
      ToastAndroid.showWithGravity(
        "Product added to cart 🛒",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }

    if (result === "exists") {
      ToastAndroid.showWithGravity(
        "Product already added ⚠️",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }

    if (result === "error") {
      ToastAndroid.showWithGravity(
        "Something went wrong. Try again.",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };
  const shareCard = async () => {
    try {
      if (!viewShotRef.current) return;

      const uri = await viewShotRef.current.capture();
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.log("Share error:", error);
    }
  };

  return (
    <LinearGradient colors={theme.gradientBackground} style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* SCREENSHOT AREA (ONLY PRODUCT CONTENT) */}
        <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 0.95 }}>
          <>
            {/* TOP CARD */}
            <View
              style={[
                styles.topCard,
                {
                  backgroundColor: theme.cardBackground,
                  borderColor: theme.accent,
                },
              ]}
            >
              <Image
                source={{ uri: product.image }}
                style={styles.image}
                resizeMode="contain"
              />

              <Text style={[styles.title, { color: theme.text }]}>
                {product.title}
              </Text>

              <Text style={[styles.price, { color: theme.accent }]}>
                € {product.price}
              </Text>
            </View>

            {/* DESCRIPTION */}
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
                {product.prod_description ||
                  "No mystical description available."}
              </Text>
            </View>
          </>
        </ViewShot>

        {/* BUTTONS */}
        <View style={styles.buttonsRow}>
          {/* ADD */}
          <TouchableOpacity
            style={[
              styles.rowButton,
              {
                backgroundColor: isInCart(product.id)
                  ? "#4CAF50"
                  : theme.accent,
              },
            ]}
            onPress={handleAddToCart}
          >
            <Ionicons
              name={isInCart(product.id) ? "checkmark-circle" : "cart"}
              size={18}
              color={theme.background}
            />
            <Text
              style={[styles.rowButtonText, { color: theme.background }]}
              numberOfLines={1}
            >
              {isInCart(product.id) ? "Added" : "Add"}
            </Text>
          </TouchableOpacity>

          {/* SHARE */}
          <TouchableOpacity
            style={[
              styles.rowButton,
              {
                backgroundColor: theme.cardBackground,
                borderColor: theme.accent,
                borderWidth: 1.5,
              },
            ]}
            onPress={shareCard}
          >
            <Ionicons name="share-social" size={18} color={theme.accent} />
            <Text
              style={[styles.rowButtonText, { color: theme.text }]}
              numberOfLines={1}
            >
              Share
            </Text>
          </TouchableOpacity>

          {/* CART */}
          <TouchableOpacity
            style={[
              styles.rowButton,
              {
                backgroundColor: theme.cardBackground,
                borderColor: theme.accent,
                borderWidth: 1.5,
              },
            ]}
            onPress={() => navigation.navigate("CartModal")}
          >
            <Ionicons name="bag" size={18} color={theme.accent} />
            <Text
              style={[styles.rowButtonText, { color: theme.text }]}
              numberOfLines={1}
            >
              Cart
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 22,
  },

  /* PRODUCT CARD */
  topCard: {
    borderRadius: 22,
    borderWidth: 1.5,
    padding: 22,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },

  image: {
    width: 240,
    height: 240,
    borderRadius: 18,
    marginBottom: 18,
  },

  title: {
    fontSize: 21,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },

  price: {
    fontSize: 19,
    fontWeight: "700",
  },

  /* DESCRIPTION */
  descriptionCard: {
    borderRadius: 22,
    borderWidth: 1.5,
    padding: 20,
    marginTop: 16,
  },

  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
  },

  /* BUTTONS */
  buttonsColumn: {
    marginTop: 10,
    gap: 16,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 12,
  },

  rowButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 20,
    elevation: 3,
    gap: 6,
  },

  rowButtonText: {
    fontSize: 14,
    fontWeight: "700",
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 17,
    borderRadius: 22,
    elevation: 4,
  },

  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 17,
    borderRadius: 22,
    borderWidth: 1.5,
  },

  primaryButtonText: {
    fontSize: 15,
    fontWeight: "700",
  },

  secondaryButtonText: {
    fontSize: 15,
    fontWeight: "700",
  },

  iconSpacing: {
    marginRight: 8,
  },
});
