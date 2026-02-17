import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../context/ThemeProvider";

export default function ProfileScreen() {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Image
        source={{ uri: user?.avatar || "https://i.pravatar.cc/150?img=47" }}
        style={[styles.avatar, { borderColor: theme.accent }]}
      />
      <Text
        style={[
          styles.name,
          { color: theme.text, fontFamily: theme.fontFamily },
        ]}
      >
        {user?.username || "-"}
      </Text>
      <Text
        style={[
          styles.email,
          { color: theme.text, fontFamily: theme.fontFamily },
        ]}
      >
        {user?.email || "-"}
      </Text>

      <Text
        style={[
          styles.infoLabel,
          { color: theme.accent, fontFamily: theme.fontFamily },
        ]}
      >
        Street
      </Text>
      <Text
        style={[
          styles.infoText,
          { color: theme.text, fontFamily: theme.fontFamily },
        ]}
      >
        {user?.address?.street || "-"}
      </Text>

      <Text
        style={[
          styles.infoLabel,
          { color: theme.accent, fontFamily: theme.fontFamily },
        ]}
      >
        City
      </Text>
      <Text
        style={[
          styles.infoText,
          { color: theme.text, fontFamily: theme.fontFamily },
        ]}
      >
        {user?.address?.city || "-"}
      </Text>

      <Text
        style={[
          styles.infoLabel,
          { color: theme.accent, fontFamily: theme.fontFamily },
        ]}
      >
        Country
      </Text>
      <Text
        style={[
          styles.infoText,
          { color: theme.text, fontFamily: theme.fontFamily },
        ]}
      >
        {user?.address?.country || "-"}
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.accent }]}
        onPress={() => navigation.navigate("EditProfileScreen")}
      >
        <Text
          style={[
            styles.buttonText,
            { color: theme.background, fontFamily: theme.fontFamily },
          ]}
        >
          Edit Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 12,
    borderWidth: 2,
  },
  name: { fontSize: 22, fontWeight: "700" },
  email: { fontSize: 14, marginBottom: 10 },
  infoLabel: { fontSize: 12, marginTop: 8, fontWeight: "600" },
  infoText: { fontSize: 14, textAlign: "center" },
  button: {
    marginTop: 18,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  buttonText: { fontWeight: "700", fontSize: 16 },
});
