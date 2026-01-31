import { StyleSheet, Text, View } from "react-native";

export default function ThreeCardReadingScreen() {
  return (
    <View style={styles.container}>
      <Text>Three Card Reading Screen</Text>
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
