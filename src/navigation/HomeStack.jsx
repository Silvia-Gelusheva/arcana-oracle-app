import { Image, Text, TouchableOpacity, View } from "react-native";

import { AuthContext } from "../context/AuthContext";
import HomeScreen from "../screens/Home/HomeScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { useTheme } from "../context/ThemeProvider";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme, themeName, navTheme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: theme.cardBackground,
          elevation: 0,
          shadowOpacity: 0,
          height: 70,
        },
        headerTintColor: theme.text,
        headerTitle: "",
        headerLeft: () => (
          <Text
            style={{
              color: theme.text,
              fontSize: 20,
              fontFamily: theme.fontFamily,
              letterSpacing: 1,
            }}
          >
            Arcana Oracle
          </Text>
        ),
        headerRight: () => (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            {/* Theme toggle  */}
            <TouchableOpacity
              onPress={toggleTheme}
              style={{
                paddingVertical: 6,
                paddingHorizontal: 12,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: theme.accent,
                backgroundColor: theme.cardBackground,
              }}
            >
              <Text
                style={{
                  color: theme.text,
                  fontFamily: theme.fontFamily,
                  fontSize: 12,
                  letterSpacing: 0.5,
                }}
              >
                {themeName === "light" ? "Dark" : "Light"} Theme
              </Text>
            </TouchableOpacity>

            {user ? (
              <>
                <TouchableOpacity
                  onPress={() =>
                    navigation.getParent()?.navigate("ProfileModal")
                  }
                >
                  <Image
                    source={{
                      uri: user.avatar || "https://i.pravatar.cc/150?img=47",
                    }}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      borderWidth: 2,
                      borderColor: theme.accent,
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={logout}
                  style={{
                    paddingVertical: 6,
                    paddingHorizontal: 14,
                    borderRadius: 16,
                    borderWidth: 1,
                    borderColor: theme.accent,
                    backgroundColor: theme.cardBackground,
                  }}
                >
                  <Text
                    style={{
                      color: theme.text,
                      fontSize: 12,
                      fontFamily: theme.fontFamily,
                    }}
                  >
                    Logout
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                onPress={() => navigation.getParent()?.navigate("AuthModal")}
                style={{
                  paddingVertical: 6,
                  paddingHorizontal: 14,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: theme.accent,
                  backgroundColor: theme.cardBackground,
                }}
              >
                <Text
                  style={{
                    color: theme.text,
                    fontSize: 12,
                    fontFamily: theme.fontFamily,
                  }}
                >
                  Login
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ),
      })}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: true, title: "Authentication" }}
      />
    </Stack.Navigator>
  );
}
