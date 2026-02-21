import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { CartContext } from "../../context/CartContext";
import { LinearGradient } from "expo-linear-gradient";
import { Trash } from "phosphor-react-native";
import { useContext } from "react";
import { useTheme } from "../../context/ThemeProvider";

export default function CartScreen({ navigation }) {
  const { items, decreaseQty, increaseQty, removeItem } =
    useContext(CartContext);
  const { theme } = useTheme();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (navigation.getState()?.routeNames?.includes("Checkout")) {
      navigation.navigate("Checkout");
    } else {
      navigation.navigate("CheckoutModal");
    }
  };

  if (!items.length) {
    return (
      <View
        style={[styles.emptyContainer, { backgroundColor: theme.background }]}
      >
        <Text
          style={[
            styles.emptyTitle,
            { color: theme.accent, fontFamily: theme.fontFamily },
          ]}
        >
          🜂 Your Cart is Empty
        </Text>
        <Text
          style={[
            styles.emptySubtitle,
            { color: theme.text + "cc", fontFamily: theme.fontFamily },
          ]}
        >
          The Arcana awaits your next relic...
        </Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={theme.gradientBackground} style={styles.container}>
      {/* ITEMS LIST */}
      <FlatList
        data={items}
        keyExtractor={(i) => i.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 280,
        }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.itemCard,
              {
                backgroundColor: theme.cardBackground,
                borderColor: theme.accent + "40",
              },
            ]}
          >
            <Image
              source={{ uri: item.image || "https://via.placeholder.com/100" }}
              style={styles.image}
            />

            <View style={styles.itemInfo}>
              <Text
                style={[
                  styles.title,
                  { color: theme.text, fontFamily: theme.fontFamily },
                ]}
                numberOfLines={2}
              >
                {item.title}
              </Text>

              <Text style={[styles.price, { color: theme.accent }]}>
                € {item.price}
              </Text>

              {/* Quantity */}
              <View
                style={[
                  styles.qtyWrapper,
                  {
                    borderColor: theme.accent,
                    backgroundColor: theme.background,
                  },
                ]}
              >
                <TouchableOpacity onPress={() => decreaseQty(item.id)}>
                  <Text style={[styles.qtyBtn, { color: theme.text }]}>−</Text>
                </TouchableOpacity>

                <Text style={[styles.qtyValue, { color: theme.text }]}>
                  {item.qty}
                </Text>

                <TouchableOpacity onPress={() => increaseQty(item.id)}>
                  <Text style={[styles.qtyBtn, { color: theme.text }]}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => removeItem(item.id)}
              style={styles.trash}
            >
              <Trash size={20} color={theme.accent} weight="duotone" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* ORDER SUMMARY */}
      <View
        style={[
          styles.summaryCard,
          {
            backgroundColor: theme.cardBackground,
            borderColor: theme.accent,
            marginBottom: 12,
          },
        ]}
      >
        <Text
          style={[
            styles.summaryTitle,
            { color: theme.accent, fontFamily: theme.fontFamily },
          ]}
        >
          Order Summary
        </Text>

        <View style={styles.summaryRow}>
          <Text style={{ color: theme.text }}>Subtotal</Text>
          <Text style={{ color: theme.text }}>€ {subtotal.toFixed(2)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={{ color: theme.text }}>Tax (8%)</Text>
          <Text style={{ color: theme.text }}>€ {tax.toFixed(2)}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.summaryRow}>
          <Text style={{ color: theme.accent, fontWeight: "700" }}>Total</Text>
          <Text
            style={{ color: theme.accent, fontSize: 18, fontWeight: "700" }}
          >
            € {total.toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.checkoutButton, { backgroundColor: theme.accent }]}
          onPress={handleCheckout}
        >
          <Text style={[styles.checkoutText, { color: theme.background }]}>
            Proceed to Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
  },

  emptySubtitle: {
    fontSize: 14,
    textAlign: "center",
    opacity: 0.8,
  },

  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    borderWidth: 1.5,
    padding: 14,
    marginBottom: 14,
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 14,
    marginRight: 12,
  },

  itemInfo: {
    flex: 1,
  },

  title: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
  },

  price: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
  },

  qtyWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: "flex-start",
  },

  qtyBtn: {
    fontSize: 18,
    fontWeight: "700",
    paddingHorizontal: 6,
  },

  qtyValue: {
    fontSize: 16,
    fontWeight: "700",
    marginHorizontal: 8,
  },

  trash: {
    padding: 6,
  },

  summaryCard: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1.5,
    padding: 20,
    alignSelf: "center",
  },

  summaryTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  divider: {
    height: 1,
    backgroundColor: "#555",
    marginVertical: 10,
  },

  checkoutButton: {
    marginTop: 14,
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: "center",
  },

  checkoutText: {
    fontWeight: "700",
    fontSize: 16,
  },
});
