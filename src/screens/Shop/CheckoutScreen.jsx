import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { CartContext } from "../../context/CartContext";
import { useContext } from "react";

export default function CheckoutScreen() {
  const { items, totalPrice } = useContext(CartContext);

  if (!items.length)
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>Your cart is empty</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.qty}>Qty: {item.qty}</Text>
            <Text style={styles.price}>€{item.price * item.qty}</Text>
          </View>
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.total}>Total: €{totalPrice}</Text>

        <TouchableOpacity
          style={styles.payButton}
          onPress={() => alert("Proceeding to payment...")}
        >
          <Text style={styles.payText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1c2541" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 20, color: "#e0c097", fontWeight: "600" },

  card: {
    padding: 16,
    backgroundColor: "#262d50",
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#b87333",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontWeight: "600", fontSize: 16, flex: 1, color: "#e0c097" },
  qty: { marginHorizontal: 10, fontSize: 14, color: "#f0e6ff" },
  price: { fontWeight: "600", fontSize: 16, color: "#e0c097" },

  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 16,
    backgroundColor: "#262d50",
    borderTopWidth: 1.5,
    borderColor: "#b87333",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  total: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    color: "#e0c097",
  },
  payButton: {
    backgroundColor: "#431375",
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: "#b87333",
    alignItems: "center",
  },
  payText: { color: "#e0c097", fontSize: 18, fontWeight: "600" },
});
