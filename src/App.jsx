import { StyleSheet, Text, View } from "react-native";

import HomeScreen from "./screens/Home/HomeScreen";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Arcana Oracle</Text>
      {/* <HomeScreen /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
