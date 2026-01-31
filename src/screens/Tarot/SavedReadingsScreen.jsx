import { StyleSheet, Text, View } from "react-native";

export default function SavedReadingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Saved Readings Screen</Text>
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
