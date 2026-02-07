import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { CartContext } from "../../context/CartContext";
import { useContext } from "react";

export default function CartScreen({ navigation }) {
  const { items, increaseQty, removeItem } = useContext(CartContext);

  const handleCheckout = () => {
    // ако има Checkout в stack-a → stack checkout
    if (navigation.getState()?.routeNames?.includes("Checkout")) {
      navigation.navigate("Checkout");
    } else {
      // ако е modal cart → root modal
      navigation.navigate("CheckoutModal");
    }
  };

  if (!items.length) {
    return (
      <View style={styles.center}>
        <Text>Cart is empty</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.title}</Text>
            <Text>Qty: {item.qty}</Text>

            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => increaseQty(item.id)}
                style={styles.qtyButton}
              >
                <Text>+</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => removeItem(item.id)}
                style={styles.qtyButton}
              >
                <Text>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    padding: 12,
    backgroundColor: "#eee",
    borderRadius: 10,
    marginBottom: 10,
  },
  row: { flexDirection: "row", marginTop: 5 },
  qtyButton: {
    marginRight: 10,
    padding: 6,
    backgroundColor: "#ccc",
    borderRadius: 5,
  },
  checkoutButton: {
    padding: 14,
    backgroundColor: "#000",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  checkoutText: {
    color: "#fff",
    fontWeight: "600",
  },
});
