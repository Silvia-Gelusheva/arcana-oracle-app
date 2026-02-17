import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user?.avatar || "https://i.pravatar.cc/150?img=47" }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{user?.username}</Text>
      <Text style={styles.email}>{user?.email}</Text>

      <Text style={styles.infoLabel}>Street</Text>
      <Text style={styles.infoText}>{user?.address?.street || "-"}</Text>

      <Text style={styles.infoLabel}>City</Text>
      <Text style={styles.infoText}>{user?.address?.city || "-"}</Text>

      <Text style={styles.infoLabel}>Country</Text>
      <Text style={styles.infoText}>{user?.address?.country || "-"}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("EditProfileScreen")}
      >
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const brass = "#b87333";
const parchment = "#e0c097";
const darkBlue = "#0b132b";
const panel = "#262d50";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkBlue,
    alignItems: "center",
    padding: 16,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: brass,
  },
  name: { fontSize: 22, fontWeight: "700", color: parchment },
  email: { fontSize: 14, color: "#ccc", marginBottom: 10 },
  infoLabel: { fontSize: 12, color: brass, marginTop: 8, fontWeight: "600" },
  infoText: { fontSize: 14, color: parchment, textAlign: "center" },
  button: {
    marginTop: 18,
    backgroundColor: brass,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  buttonText: { color: darkBlue, fontWeight: "700" },
});
