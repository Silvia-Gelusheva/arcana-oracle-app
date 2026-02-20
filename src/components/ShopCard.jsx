import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useTheme } from "../context/ThemeProvider";

export default function ShopCard({
  product,
  isInCart,
  onAddToCart,
  onDetails,
}) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.border,
          borderColor: theme.accent + "30",
        },
      ]}
    >
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text
          numberOfLines={1}
          style={[
            styles.title,
            { color: theme.text, fontFamily: theme.fontFamily },
          ]}
        >
          {product.title}
        </Text>

        {/* Price + Add button row */}
        <View style={styles.row}>
          <Text style={[styles.price, { color: theme.accent }]}>
            € {product.price}
          </Text>

          <TouchableOpacity
            style={[
              styles.cartButton,
              {
                backgroundColor: isInCart ? theme.accent : theme.buttonPrimary,
              },
            ]}
            onPress={onAddToCart}
          >
            <Text style={[styles.cartText, { color: theme.text }]}>
              {isInCart ? "✓" : "Add"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Details button below */}
        <TouchableOpacity
          onPress={onDetails}
          style={[styles.detailsButton, { borderColor: theme.accent }]}
        >
          <Text style={[styles.detailsText, { color: theme.accent }]}>
            Details
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    width: "48%",
    marginBottom: 16,
    borderRadius: 18,
    borderWidth: 1,
    overflow: "hidden",
    elevation: 6,
  },

  image: {
    width: "100%",
    height: 130,
  },

  content: {
    padding: 10,
  },

  title: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 6,
  },

  price: {
    fontSize: 14,
    fontWeight: "700",
  },

  cartButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },

  cartText: {
    fontSize: 12,
    fontWeight: "700",
  },

  detailsButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: "center",
    marginTop: 6,
  },

  detailsText: {
    fontSize: 11,
    fontWeight: "600",
  },
});
