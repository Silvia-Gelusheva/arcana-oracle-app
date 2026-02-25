import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { CartContext } from "../../context/CartContext";
import { LinearGradient } from "expo-linear-gradient";
import { useContext } from "react";
import { useTheme } from "../../context/ThemeProvider";

export default function CheckoutScreen() {
  const { items, setItems } = useContext(CartContext);
  const { theme } = useTheme();

  if (!items.length)
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Text
          style={[
            styles.emptyText,
            { color: theme.accent, fontFamily: theme.fontFamily },
          ]}
        >
          Your cart is empty
        </Text>
      </View>
    );

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handlePayment = () => {
    alert("Processing Payment...");
    //to do clearCart();
  };

  return (
    <LinearGradient colors={theme.gradientBackground} style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 180 }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.cardBackground,
                borderColor: theme.accent,
              },
            ]}
          >
            <Text
              style={[
                styles.title,
                { color: theme.text, fontFamily: theme.fontFamily },
              ]}
            >
              {item.title}
            </Text>

            <Text
              style={[
                styles.qty,
                { color: theme.text, fontFamily: theme.fontFamily },
              ]}
            >
              Qty: {item.qty}
            </Text>

            <Text
              style={[
                styles.price,
                { color: theme.text, fontFamily: theme.fontFamily },
              ]}
            >
              €{(item.price * item.qty).toFixed(2)}
            </Text>
          </View>
        )}
      />

      <View
        style={[
          styles.footer,
          { backgroundColor: theme.cardBackground, borderColor: theme.accent },
        ]}
      >
        <Text
          style={[
            styles.total,
            { color: theme.text, fontFamily: theme.fontFamily },
          ]}
        >
          Subtotal: €{subtotal.toFixed(2)}
        </Text>

        <Text
          style={[
            styles.total,
            { color: theme.text, fontFamily: theme.fontFamily },
          ]}
        >
          Tax (8%): €{tax.toFixed(2)}
        </Text>

        <Text
          style={[
            styles.total,
            { color: theme.accent, fontFamily: theme.fontFamily },
          ]}
        >
          Total: €{total.toFixed(2)}
        </Text>

        <TouchableOpacity
          style={[
            styles.payButton,
            { borderColor: theme.accent, backgroundColor: theme.accent },
          ]}
          onPress={handlePayment}
        >
          <Text
            style={[
              styles.payText,
              { color: theme.background, fontFamily: theme.fontFamily },
            ]}
          >
            Proceed to Payment
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 20, fontWeight: "600" },

  card: {
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 16,
    borderWidth: 1.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 16, fontWeight: "600", flex: 1 },
  qty: { marginHorizontal: 10, fontSize: 14 },
  price: { fontSize: 16, fontWeight: "600" },

  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 16,
    borderTopWidth: 1.5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  total: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  payButton: {
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 25,
    borderWidth: 1.5,
    alignItems: "center",
  },
  payText: { fontSize: 18, fontWeight: "600" },
});
