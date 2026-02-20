import { Switch, Text, TouchableOpacity, View } from "react-native";

import { AuthContext } from "../context/AuthContext";
import HomeScreen from "../screens/Home/HomeScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useContext } from "react";
import { useTheme } from "../context/ThemeProvider";

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  const { logout, user } = useContext(AuthContext);
  const { theme, toggleTheme, themeName } = useTheme();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTintColor: theme.text,
        drawerStyle: {
          backgroundColor: theme.cardBackground,
        },
        drawerActiveTintColor: theme.accent,
        drawerInactiveTintColor: theme.text,
      }}
      drawerContent={(props) => (
        <View style={{ flex: 1, padding: 20 }}>
          {/* User Info */}
          <Text
            style={{
              color: theme.text,
              fontSize: 18,
              fontFamily: theme.fontFamily,
              marginBottom: 20,
            }}
          >
            {user?.username || "Guest"}
          </Text>

          {/* Default Drawer Items */}
          {props.children}

          {/* Theme Toggle */}
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: theme.text }}>Dark Mode</Text>
            <Switch
              value={themeName === "dark"}
              onValueChange={toggleTheme}
              trackColor={{
                false: theme.cardBackground,
                true: theme.accent,
              }}
              thumbColor={theme.background}
            />
          </View>

          {/* Logout */}
          {user && (
            <TouchableOpacity
              onPress={logout}
              style={{
                marginTop: 30,
                padding: 12,
                borderRadius: 12,
                backgroundColor: theme.accent,
              }}
            >
              <Text
                style={{
                  color: theme.background,
                  textAlign: "center",
                  fontFamily: theme.fontFamily,
                }}
              >
                Logout
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      {user && <Drawer.Screen name="Profile" component={ProfileScreen} />}
    </Drawer.Navigator>
  );
}
