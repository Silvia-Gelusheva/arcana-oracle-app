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
            <Text style={styles.price}>${item.price * item.qty}</Text>
          </View>
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.total}>Total: ${totalPrice}</Text>

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
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 20, color: "#555" },

  card: {
    padding: 16,
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontWeight: "600", fontSize: 16, flex: 1 },
  qty: { marginHorizontal: 10, fontSize: 14, color: "#555" },
  price: { fontWeight: "600", fontSize: 16, color: "#000" },

  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  total: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  payButton: {
    backgroundColor: "#8342b8",
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 25,
    alignItems: "center",
  },
  payText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});
