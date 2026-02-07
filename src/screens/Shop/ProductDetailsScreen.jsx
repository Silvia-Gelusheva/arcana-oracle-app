import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { CartContext } from "../../context/CartContext";
import { useContext } from "react";

export default function ProductDetailsScreen({ route, navigation }) {
  const { product } = route.params;
  const { addToCart } = useContext(CartContext);

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text>${product.price}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => addToCart(product)}
      >
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#000" }]}
        onPress={() => navigation.navigate("Cart")}
      >
        <Text style={styles.buttonText}>Go To Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, alignItems: "center" },
  image: { width: 200, height: 200, marginBottom: 16 },
  title: { fontSize: 18, fontWeight: "600", marginBottom: 10 },
  button: {
    padding: 12,
    backgroundColor: "#8342b8",
    borderRadius: 8,
    marginTop: 10,
    width: 200,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600" },
});
