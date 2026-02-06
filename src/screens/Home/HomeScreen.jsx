import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export default function HomeScreen({ navigation }) {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Arcana Oracle ✨</Text>

      <TouchableOpacity
        style={styles.mainButton}
        onPress={() => navigation.navigate("ShopStack")}
      >
        <Text style={styles.buttonText}>Shop</Text>
      </TouchableOpacity>

      {user && (
        <>
          <TouchableOpacity
            style={styles.mainButton}
            onPress={() =>
              navigation.navigate("TarotStack", { screen: "DailyCard" })
            }
          >
            <Text style={styles.buttonText}>Daily Card</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.mainButton}
            onPress={() =>
              navigation.navigate("TarotStack", { screen: "ThreeCardReading" })
            }
          >
            <Text style={styles.buttonText}>Three Card Reading</Text>
          </TouchableOpacity>
        </>
      )}

      {!user && (
        <TouchableOpacity
          style={styles.mainButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Login / Register</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0a0a1a",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    color: "#f0e6ff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
    textShadowColor: "#9d85ff",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  mainButton: {
    backgroundColor: "#4b0082",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginVertical: 12,
    shadowColor: "#9d85ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
