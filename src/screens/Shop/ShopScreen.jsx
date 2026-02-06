import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useState } from "react";

const products = [
  { id: "1", name: "Tarot Deck Classic", price: 25 },
  { id: "2", name: "Mystic Oracle Cards", price: 30 },
  { id: "3", name: "Crystal Ball", price: 45 },
  { id: "4", name: "Spiritual Candle", price: 12 },
  { id: "5", name: "Incense Set", price: 15 },
  { id: "6", name: "Moon Journal", price: 20 },
  { id: "7", name: "Tarot Cloth", price: 18 },
  { id: "8", name: "Amethyst Stone", price: 22 },
];

export default function ShopScreen({ navigation }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.price}>${item.price}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => addToCart(item)}
            >
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.goToCart}
        onPress={() => navigation.navigate("CartTab", { items: cartItems })}
      >
        <Text style={styles.goToCartText}>Go to Cart ({cartItems.length})</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  card: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
  },
  title: { fontSize: 16, fontWeight: "600" },
  price: { marginVertical: 6 },
  button: {
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#8342b8",
    alignItems: "center",
  },
  buttonText: { color: "#fff" },
  goToCart: {
    marginTop: 16,
    padding: 14,
    backgroundColor: "#000",
    borderRadius: 8,
    alignItems: "center",
  },
  goToCartText: { color: "#fff", fontWeight: "600" },
});
