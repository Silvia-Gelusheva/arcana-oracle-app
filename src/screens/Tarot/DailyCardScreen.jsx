import { StyleSheet, Text, View } from "react-native";

export default function DailyCardScreen() {
  return (
    <View style={styles.container}>
      <Text>Daily Card Screen</Text>
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
