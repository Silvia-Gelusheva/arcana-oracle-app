import { Image, StyleSheet, Text, View } from "react-native";

import { useTheme } from "../context/ThemeProvider";

export default function ProfileCard({ user }) {
  const { theme } = useTheme();

  const avatarSource = user?.avatar
    ? { uri: user.avatar }
    : require("../../assets/avatar.png");

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.cardBackground, borderColor: theme.accent },
      ]}
    >
      {/* Avatar */}
      <View style={[styles.avatarContainer, { borderColor: theme.accent }]}>
        <Image source={avatarSource} style={styles.avatar} />
      </View>

      {/* Name & Email */}
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
          { color: theme.textSecondary, fontFamily: theme.fontFamily },
        ]}
      >
        {user?.email || "-"}
      </Text>

      {/* Decorative Divider */}
      <View style={[styles.dividerContainer]}>
        <View style={[styles.divider, { backgroundColor: theme.accent }]} />
      </View>

      {/* User Info */}
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: theme.accent }]}>
            Street
          </Text>
          <Text style={[styles.infoText, { color: theme.text }]}>
            {user?.address?.street || "-"}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: theme.accent }]}>City</Text>
          <Text style={[styles.infoText, { color: theme.text }]}>
            {user?.address?.city || "-"}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: theme.accent }]}>
            Country
          </Text>
          <Text style={[styles.infoText, { color: theme.text }]}>
            {user?.address?.country || "-"}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    borderRadius: 24,
    borderWidth: 1.5,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  avatarContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  name: {
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    marginBottom: 20,
  },
  dividerContainer: {
    width: "60%",
    marginVertical: 20,
    alignItems: "center",
  },
  divider: {
    width: "100%",
    height: 3,
    borderRadius: 1.5,
    opacity: 0.7,
  },
  infoContainer: {
    width: "100%",
    paddingHorizontal: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  infoText: {
    fontSize: 15,
    fontWeight: "500",
  },
});
