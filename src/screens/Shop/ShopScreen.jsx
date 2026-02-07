import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { CartContext } from "../../context/CartContext";
import { ProductsContext } from "../../context/ProductsContext";
import { useContext } from "react";

export default function ShopScreen({ navigation }) {
  const { products, loading } = useContext(ProductsContext);
  const { addToCart, items } = useContext(CartContext);

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>${item.price}</Text>

            <View style={styles.row}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => addToCart(item)}
              >
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#555" }]}
                onPress={() =>
                  navigation.navigate("ProductDetails", { product: item })
                }
              >
                <Text style={styles.buttonText}>Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.goToCart}
        onPress={() => navigation.navigate("Cart")}
      >
        <Text style={styles.goToCartText}>Go to Cart ({items.length})</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    padding: 16,
    marginBottom: 10,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  title: { fontWeight: "600", marginBottom: 5 },
  row: { flexDirection: "row", marginTop: 10 },
  button: {
    flex: 1,
    padding: 10,
    backgroundColor: "#8342b8",
    borderRadius: 8,
    marginRight: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600" },
  goToCart: {
    padding: 14,
    backgroundColor: "#000",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  goToCartText: { color: "#fff", fontWeight: "600" },
});
