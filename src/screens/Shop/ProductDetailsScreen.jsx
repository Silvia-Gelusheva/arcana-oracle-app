import { StyleSheet, Text, View } from "react-native";

export default function ProductDetailsScreen() {
  return (
    <View style={styles.container}>
      <Text>Product Details Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
});
