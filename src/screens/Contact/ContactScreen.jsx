import { StyleSheet, Text, View } from "react-native";

export default function ContactScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us ✨</Text>
      <Text style={styles.text}>
        For questions, support, or collaborations, reach us at:
      </Text>
      <Text style={styles.text}>Email: support@arcanaoracle.com</Text>
      <Text style={styles.text}>Phone: +123 456 7890</Text>
      <Text style={styles.text}>Follow us on social media for updates!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0a0a1a",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#f0e6ff",
    marginBottom: 20,
    textShadowColor: "#9d85ff",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  text: {
    fontSize: 16,
    color: "#e0d6ff",
    lineHeight: 24,
    marginBottom: 12,
  },
});
