import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useState } from "react";

export default function CartScreen({ navigation }) {
  const [cart, setCart] = useState([
    { id: "1", name: "Tarot Deck Classic", price: 25, qty: 1 },
    { id: "2", name: "Crystal Ball", price: 45, qty: 1 },
    { id: "3", name: "Amethyst Stone", price: 22, qty: 1 },
  ]);

  const increase = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item,
      ),
    );
  };

  const decrease = (id) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0),
    );
  };

  const remove = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{ color: "#8342b8", marginBottom: 10 }}>
          ← Back to Shop
        </Text>
      </TouchableOpacity>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.title}>{item.name}</Text>
              <Text>${item.price}</Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity onPress={() => decrease(item.id)}>
                <Text style={styles.btn}>-</Text>
              </TouchableOpacity>

              <Text style={styles.qty}>{item.qty}</Text>

              <TouchableOpacity onPress={() => increase(item.id)}>
                <Text style={styles.btn}>+</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => remove(item.id)}>
                <Text style={styles.remove}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.total}>Total: ${total}</Text>

        <TouchableOpacity style={styles.pay}>
          <Text style={styles.payText}>Pay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
  },
  title: { fontWeight: "600" },
  actions: { flexDirection: "row", alignItems: "center" },
  btn: {
    fontSize: 18,
    paddingHorizontal: 10,
    fontWeight: "bold",
  },
  qty: { marginHorizontal: 8 },
  remove: { marginLeft: 12, color: "red", fontSize: 18 },
  footer: { marginTop: 10 },
  total: { fontSize: 18, fontWeight: "600", marginBottom: 10 },
  pay: {
    backgroundColor: "#8342b8",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  payText: { color: "#fff", fontWeight: "600" },
});
