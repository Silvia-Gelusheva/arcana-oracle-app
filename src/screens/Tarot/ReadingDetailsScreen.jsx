import { StyleSheet, Text, View } from "react-native";

export default function ReadingDetailsScreen() {
  return (
    <View style={styles.container}>
      <Text>Reading Details Screen</Text>
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
