import { Gear, SignInIcon, SignOutIcon } from "phosphor-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AuthContext } from "../context/AuthContext";
import HomeScreen from "../screens/Home/HomeScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { useTheme } from "../context/ThemeProvider";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  const { user, logout } = useContext(AuthContext);
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        header: () => (
          <View
            style={[
              styles.headerContainer,
              { backgroundColor: theme.background },
            ]}
          >
            {/* ROW: TITLE + ICONS */}
            <View style={styles.headerRow}>
              {/* Title */}
              <View style={styles.titleContainer}>
                <Text
                  style={{
                    color: theme.text,
                    fontFamily: theme.fontFamily,
                    fontSize: 28,
                    fontWeight: "600",
                  }}
                >
                  Arcana
                </Text>
                <Text
                  style={{
                    color: theme.textSecondary,
                    fontFamily: theme.fontFamily,
                    fontSize: 16,
                    letterSpacing: 2,
                  }}
                >
                  ORACLE
                </Text>
                <Text
                  style={{
                    color: theme.textSecondary,
                    fontFamily: theme.fontFamily,
                    fontSize: 14,
                    marginTop: 4,
                  }}
                >
                  Unveil the mysteries of the cards
                </Text>
              </View>

              {/* Icons */}
              <View style={styles.actionsRow}>
                {/* Gear */}
                <TouchableOpacity
                  onPress={() =>
                    navigation.getParent()?.navigate("ProfileModal")
                  }
                  style={[
                    styles.iconButton,
                    {
                      backgroundColor: theme.cardBackground,
                      borderColor: theme.accent,
                    },
                  ]}
                >
                  <Gear size={20} color={theme.accent} weight="bold" />
                </TouchableOpacity>

                {/* Login / Logout */}
                <TouchableOpacity
                  onPress={() => {
                    if (user) logout();
                    else navigation.getParent()?.navigate("AuthModal");
                  }}
                  style={[
                    styles.iconButton,
                    user
                      ? {
                          backgroundColor: theme.cardBackground,
                          borderColor: "#74d7a1ff",
                        }
                      : {
                          backgroundColor: theme.otherBackground,
                          borderColor: "#db7ba1ff",
                        },
                  ]}
                >
                  {user ? (
                    <SignOutIcon size={20} color="#74d7a1ff" weight="bold" />
                  ) : (
                    <SignInIcon size={20} color="#db7ba1ff" weight="bold" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Divider */}
            <View style={[styles.divider, { backgroundColor: theme.accent }]} />
          </View>
        ),
      })}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    paddingRight: 10,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    height: 1,
    marginTop: 12,
    borderRadius: 0.5,
    opacity: 0.6,
  },
});
