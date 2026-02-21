import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { AuthContext } from "../../context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import ProfileCard from "../../components/ProfileCard";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../context/ThemeProvider";

export default function ProfileScreen() {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme, themeName } = useTheme();
  const navigation = useNavigation();

  if (!user) return null;

  const handleLogout = () => {
    logout();

    navigation.reset({
      index: 0,
      routes: [
        {
          name: "MainTabs",
          state: {
            index: 0,
            routes: [{ name: "HomeTab" }],
          },
        },
      ],
    });
  };
  return (
    <LinearGradient colors={theme.gradientBackground} style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* PROFILE CARD */}
        <ProfileCard user={user} />

        {/* SETTINGS CARD */}
        <View
          style={[
            styles.settingsCard,
            {
              backgroundColor: theme.cardBackground,
              borderColor: theme.accent,
            },
          ]}
        >
          <Text
            style={[
              styles.settingsTitle,
              { color: theme.text, fontFamily: theme.fontFamily },
            ]}
          >
            Settings
          </Text>

          <View style={[styles.divider, { backgroundColor: theme.accent }]} />

          {/* APPEARANCE ROW */}
          <View style={styles.row}>
            <Text
              style={[
                styles.rowLabel,
                { color: theme.textSecondary, fontFamily: theme.fontFamily },
              ]}
            >
              Appearance
            </Text>

            <TouchableOpacity
              onPress={toggleTheme}
              activeOpacity={0.8}
              style={[
                styles.toggleContainer,
                {
                  borderColor: theme.accent,
                  backgroundColor: theme.cardBackground,
                },
              ]}
            >
              <View style={styles.iconsRow}>
                <Text style={{ fontSize: 12, color: theme.accent }}>☀</Text>
                <Text style={{ fontSize: 12, color: theme.accent }}>🌙</Text>
              </View>

              <View
                style={[
                  styles.thumb,
                  {
                    backgroundColor: theme.accent,
                    alignSelf: themeName === "dark" ? "flex-end" : "flex-start",
                  },
                ]}
              />
            </TouchableOpacity>
          </View>

          <View
            style={[styles.innerDivider, { backgroundColor: theme.accent }]}
          />

          {/* EDIT PROFILE ROW */}
          <View style={styles.row}>
            <Text
              style={[
                styles.rowLabel,
                { color: theme.textSecondary, fontFamily: theme.fontFamily },
              ]}
            >
              Edit Profile
            </Text>

            <TouchableOpacity
              activeOpacity={0.85}
              style={[
                styles.editButton,
                {
                  borderColor: theme.accent,
                  backgroundColor: theme.cardBackground,
                },
              ]}
              onPress={() => navigation.navigate("EditProfileScreen")}
            >
              <Text
                style={[
                  styles.editText,
                  { color: theme.accent, fontFamily: theme.fontFamily },
                ]}
              >
                Edit
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={[styles.innerDivider, { backgroundColor: theme.accent }]}
          />

          {/* LOGOUT */}
          <TouchableOpacity
            style={[styles.logoutButton, { borderColor: theme.accent }]}
            onPress={handleLogout}
          >
            <Text
              style={[
                styles.logoutText,
                { color: theme.accent, fontFamily: theme.fontFamily },
              ]}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingVertical: 30,
    paddingHorizontal: 20,
  },

  /* SETTINGS CARD */
  settingsCard: {
    width: "100%",
    borderRadius: 24,
    borderWidth: 1.5,
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginTop: 24,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  settingsTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  divider: {
    height: 2,
    width: "40%",
    borderRadius: 2,
    opacity: 0.7,
    marginBottom: 20,
  },
  innerDivider: {
    height: 1,
    width: "100%",
    opacity: 0.3,
    marginVertical: 20,
  },

  /* ROW */
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: "500",
  },

  /* TOGGLE */
  toggleContainer: {
    width: 70,
    height: 36,
    borderRadius: 20,
    borderWidth: 1.5,
    justifyContent: "center",
    padding: 3,
  },
  iconsRow: {
    position: "absolute",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  thumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },

  /* EDIT */
  editButton: {
    minWidth: 80,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  editText: {
    fontSize: 14,
    fontWeight: "600",
  },

  /* LOGOUT */
  logoutButton: {
    borderWidth: 1.5,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "600",
  },
});
